import * as fs from "node:fs";
import * as path from "node:path";

import { afterAll, beforeAll, expect, it } from "vitest";

import { oauthCredential as credentials, user } from "@/tests/config";

import { upload } from "../../upload/upload";
import { deletePhoto } from "../photo/delete";
import { create, type CreateResponse } from "./create";
import { getList } from "./get-list";

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

it("should create photoset", async () => {
  const operationResult = await create({
    credentials,
    title: "Create Photoset Test",
    primaryPhotoId: photoId,
  });

  const expected = {
    id: expect.any(String),
    url: expect.any(String),
  } satisfies CreateResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);

  // check operation result
  const { photoset } = await getList({
    credentials,
    userId: user.nsid,
  });

  expect(photoset).toMatchObject([
    expect.objectContaining({ id: operationResult.id }),
  ]);
});
