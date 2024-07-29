import * as fs from "node:fs";
import * as path from "node:path";

import {
  afterAll,
  beforeAll,
  beforeEach,
  expect,
  expectTypeOf,
  it,
} from "vitest";

import { oauthCredential as credentials, user } from "@/tests/config";

import { upload } from "../../upload/upload";
import { deletePhoto } from "../photo/delete";
import { create } from "./create";
import { editPhotos, type EditPhotosResponse } from "./edit-photos";
import { getPhotos } from "./get-photos";

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
  const photoset = await create({
    credentials,
    title: "Reorder Photos Test",
    primaryPhotoId: photoIds[0],
  });

  photosetId = photoset.id;
});

it("should edit photos in photoset", async () => {
  const reordered = [photoIds[2], photoIds[1]];

  const operationResult = await editPhotos({
    credentials,
    photosetId,
    primaryPhotoId: photoIds[1],
    photoIds: reordered,
  });

  const expected = {
    stat: "ok",
  } satisfies EditPhotosResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);
  expectTypeOf(operationResult).toMatchTypeOf<typeof expected>();

  const { photo } = await getPhotos({
    credentials,
    userId: user.nsid,
    photosetId,
  });

  expect(photo.length).toBe(2);
  expect(photo).toMatchObject(
    reordered.map((id) => expect.objectContaining({ id })),
  );
});
