import * as fs from "node:fs";
import * as path from "node:path";

import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";

import { oauthCredential as credentials, user } from "@/tests/config";

import { upload } from "../../upload/upload";
import { deletePhoto } from "../photo/delete";
import { addPhoto } from "./add-photo";
import { create } from "./create";
import { getPhotos } from "./get-photos";
import { removePhoto } from "./remove-photo";

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
    title: "Remove Photo Test",
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

it("should remove specific photo from photoset", async () => {
  const operationResult = await removePhoto({
    credentials,
    photosetId,
    photoId: photoIds[1],
  });

  // check if the response context matches expected schema
  expect(operationResult).toEqual({ stat: "ok" });

  // check if photos are removed
  const { photo } = await getPhotos({
    credentials,
    userId: user.nsid,
    photosetId,
  });

  expect(photo.length).toBe(2);
  expect(photo).toMatchObject(
    expect.arrayContaining([
      expect.objectContaining({ id: photoIds[0] }),
      expect.objectContaining({ id: photoIds[2] }),
    ]),
  );
});
