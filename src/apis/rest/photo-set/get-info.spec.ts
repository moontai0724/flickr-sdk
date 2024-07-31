import * as fs from "node:fs";
import * as path from "node:path";

import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";

import { oauthCredential as credentials, user } from "@/tests/config";

import { upload } from "../../upload/upload";
import { deletePhoto } from "../photo/delete";
import { create } from "./create";
import { getInfo, type GetInfoResponse } from "./get-info";

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
  const photoset = await create({
    credentials,
    title: "Get Info Test",
    primaryPhotoId: photoId,
  });

  photosetId = photoset.id;
});

it("should get info in photoset", async () => {
  const operationResult = await getInfo({
    credentials,
    userId: user.nsid,
    photosetId,
  });

  const expected = {
    id: photosetId,
    owner: user.nsid,
    username: expect.any(String),
    primary: photoId,
    secret: expect.any(String),
    server: expect.any(String),
    farm: expect.any(Number),
    countViews: "0",
    countComments: "0",
    countPhotos: 1,
    countVideos: 0,
    title: "Get Info Test",
    description: "",
    canComment: 1,
    dateCreate: expect.any(String),
    dateUpdate: "0",
    sortingOptionId: "manual-add-to-end",
    photos: 1,
    visibilityCanSeeSet: 1,
    needsInterstitial: 0,
  } satisfies GetInfoResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);
});
