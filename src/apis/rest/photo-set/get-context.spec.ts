import * as fs from "node:fs";
import * as path from "node:path";

import { License } from "types";
import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";

import { oauthCredential as credentials, user } from "@/tests/config";

import { upload } from "../../upload/upload";
import { deletePhoto } from "../photo/delete";
import { addPhoto } from "./add-photo";
import { create } from "./create";
import { getContext, type GetContextResponse } from "./get-context";

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
  const photoset = await create({
    credentials,
    title: "Get Context Test",
    primaryPhotoId: photoIds[0],
  });

  photosetId = photoset.id;

  await addPhoto({
    credentials,
    photosetId,
    photoId: photoIds[1],
  });
});

it("should edit photos in photoset", async () => {
  const operationResult = await getContext({
    credentials,
    photosetId,
    photoId: photoIds[0],
  });

  const expected = {
    stat: "ok",
    count: "2",
    prevphoto: {
      id: 0,
      isFaved: 0,
    },
    nextphoto: {
      id: photoIds[1],
      owner: user.nsid,
      secret: expect.any(String),
      server: expect.any(String),
      farm: expect.any(Number),
      title: "月太-0032",
      url: expect.any(String),
      thumb: expect.any(String),
      license: License.AllRightReserved,
      media: "photo",
      isFaved: 0,
    },
  } satisfies GetContextResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);
});
