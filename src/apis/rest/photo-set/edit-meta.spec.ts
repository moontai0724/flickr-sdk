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
import { editMeta, type EditMetaResponse } from "./edit-meta";
import { getInfo } from "./get-info";

let photoId: string;

beforeAll(async () => {
  const photo = ["月太-0001.jpg"].map(
    (fileName) =>
      new File(
        [fs.readFileSync(path.resolve("tests", "assets", fileName))],
        fileName,
      ),
  )[0];

  photoId = await upload({
    credentials,
    photo,
  });
});

afterAll(async () => {
  await deletePhoto({
    credentials,
    photoId,
  });
});

let photosetId: string;

beforeEach(async () => {
  // prepare photosets
  photosetId = await create({
    credentials,
    title: `Edit Set Meta Test`,
    primaryPhotoId: photoId,
  }).then((photoset) => photoset.id);
});

it("should edit photoset meta", async () => {
  const operationResult = await editMeta({
    credentials,
    photosetId,
    title: "Edited Set",
    description: "Edited Description",
  });

  const expected = {
    id: photosetId,
    title: "Edited Set",
    description: "Edited Description",
  } satisfies EditMetaResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);
  expectTypeOf(operationResult).toMatchTypeOf<typeof expected>();

  const photoset = await getInfo({
    credentials,
    userId: user.nsid,
    photosetId,
  });

  expect(photoset).toMatchObject(expect.objectContaining(expected));
});
