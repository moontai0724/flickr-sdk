import * as fs from "node:fs";
import * as path from "node:path";

import { License } from "types";
import { afterAll, beforeAll, expect, it } from "vitest";

import { oauthCredential as credentials, user } from "@/tests/config";

import { upload } from "../../upload/upload";
import { deletePhoto } from "../photo/delete";
import { create } from "./create";
import { getList, type GetListResponse } from "./get-list";
import { orderSets } from "./order-sets";

let photoIds: string[];
let photosetIds: string[];

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

  photosetIds = await Promise.all(
    photoIds.map(async (photoId, index) =>
      create({
        credentials,
        title: `Order Sets Test ${index}`,
        primaryPhotoId: photoId,
      }),
    ),
  ).then((photosets) => photosets.map((photoset) => photoset.id));

  await orderSets({
    credentials,
    photosetIds,
  });
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

it("should get list of photosets", async () => {
  const operationResult = await getList({
    credentials,
    userId: user.nsid,
  });

  const expected = {
    page: 1,
    pages: 1,
    perpage: 500,
    total: 3,
    cancreate: 1,
    photoset: photosetIds.map((id, index) => ({
      id,
      owner: user.nsid,
      username: expect.any(String),
      primary: photoIds[index],
      secret: expect.any(String),
      server: expect.any(String),
      farm: expect.any(Number),
      countViews: "0",
      countComments: "0",
      countPhotos: 1,
      countVideos: 0,
      title: expect.any(String),
      description: "",
      canComment: 1,
      dateCreate: expect.any(String),
      dateUpdate: expect.any(String),
      sortingOptionId: "manual-add-to-end",
      photos: 1,
      videos: 0,
      visibilityCanSeeSet: 1,
      needsInterstitial: 0,
    })),
  } satisfies GetListResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);
});

it("should present hasRequestedPhotos when specific photoIds are in the photoset", async () => {
  const operationResult = await getList({
    credentials,
    userId: user.nsid,
    photoIds: [photoIds[0]],
  });

  const expected = {
    page: 1,
    pages: 1,
    perpage: 500,
    total: 3,
    cancreate: 1,
    photoset: photosetIds.map((id, index) => ({
      id,
      owner: user.nsid,
      username: expect.any(String),
      primary: photoIds[index],
      secret: expect.any(String),
      server: expect.any(String),
      farm: expect.any(Number),
      countViews: "0",
      countComments: "0",
      countPhotos: 1,
      countVideos: 0,
      title: expect.any(String),
      description: "",
      canComment: 1,
      dateCreate: expect.any(String),
      dateUpdate: expect.any(String),
      sortingOptionId: "manual-add-to-end",
      photos: 1,
      videos: 0,
      visibilityCanSeeSet: 1,
      needsInterstitial: 0,
      hasRequestedPhotos: index === 0 ? [photoIds[0]] : [],
    })),
  } satisfies GetListResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);
});

it("should get list of photosets with photo extras", async () => {
  const operationResult = await getList({
    credentials,
    userId: user.nsid,
    page: 1,
    perPage: 1,
    primaryPhotoExtras: [
      "license",
      "date_upload",
      "date_taken",
      "owner_name",
      "icon_server",
      "original_format",
      "last_update",
      "geo",
      "tags",
      "machine_tags",
      "o_dims",
      "views",
      "media",
      "path_alias",
      "url_sq",
      "url_t",
      "url_s",
      "url_m",
      "url_o",
    ],
  });

  const expected = {
    page: 1,
    pages: 3,
    perpage: 1,
    total: 3,
    cancreate: 1,
    photoset: [
      {
        id: photosetIds[0],
        owner: user.nsid,
        username: expect.any(String),
        primary: photoIds[0],
        secret: expect.any(String),
        server: expect.any(String),
        farm: expect.any(Number),
        countViews: "0",
        countComments: "0",
        countPhotos: 1,
        countVideos: 0,
        title: expect.any(String),
        description: "",
        canComment: 1,
        dateCreate: expect.any(String),
        dateUpdate: expect.any(String),
        sortingOptionId: "manual-add-to-end",
        photos: 1,
        videos: 0,
        visibilityCanSeeSet: 1,
        needsInterstitial: 0,
        primaryPhotoExtras: {
          accuracy: 0,
          context: 0,
          datetaken: expect.any(String),
          datetakengranularity: 0,
          datetakenunknown: "1",
          dateupload: expect.any(String),
          heightM: expect.any(Number),
          heightO: expect.any(Number),
          heightS: expect.any(Number),
          heightSq: expect.any(Number),
          heightT: expect.any(Number),
          iconfarm: expect.any(Number),
          iconserver: expect.any(String),
          lastupdate: expect.any(String),
          latitude: expect.any(Number),
          license: License.AllRightReserved,
          longitude: expect.any(Number),
          machineTags: expect.any(String),
          media: "photo",
          mediaStatus: "ready",
          originalformat: "jpg",
          originalsecret: expect.any(String),
          ownername: "moontai0724-developer",
          pathalias: null,
          tags: expect.any(String),
          urlM: expect.any(String),
          urlO: expect.any(String),
          urlS: expect.any(String),
          urlSq: expect.any(String),
          urlT: expect.any(String),
          views: "0",
          widthM: expect.any(Number),
          widthO: expect.any(Number),
          widthS: expect.any(Number),
          widthSq: expect.any(Number),
          widthT: expect.any(Number),
        },
      },
    ],
  } satisfies GetListResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);
});
