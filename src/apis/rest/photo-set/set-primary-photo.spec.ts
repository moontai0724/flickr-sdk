import * as fs from "node:fs";
import * as path from "node:path";

import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";

import { oauthCredential as credentials, user } from "@/tests/config";

import { upload } from "../../upload/upload";
import { deletePhoto } from "../photo/delete";
import { addPhoto } from "./add-photo";
import { create } from "./create";
import { getInfo } from "./get-info";
import { setPrimaryPhoto } from "./set-primary-photo";

let photoIds: string[];

beforeAll(async () => {
  const files = ["月太-0001.jpg", "月太-0032.jpg"].map(
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
    title: "Set Primary Photos Test",
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

it("should set primary photo for photoset", async () => {
  const operationResult = await setPrimaryPhoto({
    credentials,
    photosetId,
    photoId: photoIds[1],
  });

  // check if the response context matches expected schema
  expect(operationResult).toEqual({ stat: "ok" });

  // check if photos are removed
  const { primary } = await getInfo({
    credentials,
    userId: user.nsid,
    photosetId,
  });

  expect(primary).toBe(photoIds[1]);
});
