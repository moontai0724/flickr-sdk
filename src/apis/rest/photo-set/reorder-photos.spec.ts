import * as fs from "node:fs";
import * as path from "node:path";

import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";

import { oauthCredential as credentials, user } from "@/tests/config";

import { upload } from "../../upload/upload";
import { deletePhoto } from "../photo/delete";
import { addPhoto } from "./add-photo";
import { create } from "./create";
import { getPhotos } from "./get-photos";
import { reorderPhotos } from "./reorder-photos";

let photoIds: string[];

beforeAll(async () => {
  const files = ["月太-0001.jpg", "月太-0032.jpg", "月太-0035.jpg"].map(
    (fileName) =>
      new File(
        [fs.readFileSync(path.resolve("tests", "assets", fileName))],
        fileName,
      ),
  );

  photoIds = await Promise.all(
    files.map((photo) =>
      upload({
        credentials,
        photo,
      }),
    ),
  );
});

afterAll(async () => {
  await Promise.all(
    photoIds.map((photoId) =>
      deletePhoto({
        credentials,
        photoId,
      }),
    ),
  );
});

let photosetId: string;

beforeEach(async () => {
  // prepare photoset with photos to remove
  const photoset = await create({
    credentials,
    title: "Reorder Photos Test",
    primaryPhotoId: photoIds[0],
  });

  photosetId = photoset.id;

  await Promise.all(
    photoIds.slice(1).map(async (photoId) =>
      addPhoto({
        credentials,
        photosetId,
        photoId,
      }),
    ),
  );
});

it("should reorder photos in photoset", async () => {
  const reordered = [photoIds[2], photoIds[0], photoIds[1]];

  const operationResult = await reorderPhotos({
    credentials,
    photosetId,
    photoIds: reordered,
  });

  // check if the response context matches expected schema
  expect(operationResult).toEqual({
    stat: "ok",
    sortingOptionId: expect.any(String),
  });

  // check if photos are removed
  const { photo } = await getPhotos({
    credentials,
    userId: user.nsid,
    photosetId,
  });

  expect(photo.length).toBe(3);
  expect(photo).toMatchObject(
    reordered.map((id) => expect.objectContaining({ id })),
  );
});
