import * as fs from "node:fs";
import * as path from "node:path";

import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";

import { oauthCredential as credentials, user } from "@/tests/config";

import { upload } from "../../upload/upload";
import { deletePhoto } from "../photo/delete";
import { create } from "./create";
import { deletePhotoset } from "./delete";
import { getList } from "./get-list";

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

let photosetIds: string[];

beforeEach(async () => {
  // prepare photosets
  photosetIds = await Promise.all(
    photoIds.map(async (photoId, index) =>
      create({
        credentials,
        title: `Delete Set Test ${index}`,
        primaryPhotoId: photoId,
      }),
    ),
  ).then((photosets) => photosets.map((photoset) => photoset.id));
});

it("should delete photoset", async () => {
  const operationResult = await deletePhotoset({
    credentials,
    photosetId: photosetIds[1],
  });

  // check if the response context matches expected schema
  expect(operationResult).toEqual({ stat: "ok" });

  // check if photoset has removed
  const { photoset } = await getList({
    credentials,
    userId: user.nsid,
  });

  expect(photoset).toMatchObject([
    expect.objectContaining({ id: photosetIds[0] }),
    expect.objectContaining({ id: photosetIds[2] }),
  ]);
});
