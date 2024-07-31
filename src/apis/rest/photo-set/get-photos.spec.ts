import * as fs from "node:fs";
import * as path from "node:path";

import { License } from "types";
import { afterAll, beforeAll, expect, it } from "vitest";

import { oauthCredential as credentials, user } from "@/tests/config";

import { upload } from "../../upload/upload";
import { deletePhoto } from "../photo/delete";
import { addPhoto } from "./add-photo";
import { create } from "./create";
import {
  getPhotos,
  GetPhotosPrivacyFilter,
  type GetPhotosResponse,
} from "./get-photos";

let photoIds: string[];
let photosetId: string;

beforeAll(async () => {
  const files = ["月太-0001.jpg", "月太-0032.jpg", "月太-0035.jpg"].map(
    (fileName) =>
      new File(
        [fs.readFileSync(path.resolve("tests", "assets", fileName))],
        fileName,
      ),
  );

  photoIds = await Promise.all(
    files.map((photo, index) =>
      upload({
        credentials,
        photo,
        isPublic: index !== 0,
        isFriend: index === 0,
        isFamily: index === 0,
      }),
    ),
  );

  const photoset = await create({
    credentials,
    title: "Get Photos Test",
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

it("should get photos in photoset", async () => {
  const operationResult = await getPhotos({
    credentials,
    userId: user.nsid,
    photosetId,
  });

  const expected = {
    id: photosetId,
    primary: photoIds[0],
    owner: user.nsid,
    ownername: user.name,
    photo: photoIds.map((id, index) => ({
      id,
      secret: expect.any(String),
      server: expect.any(String),
      farm: expect.any(Number),
      title: expect.any(String),
      ispublic: index === 0 ? 0 : 1,
      isfriend: index === 0 ? 1 : 0,
      isfamily: index === 0 ? 1 : 0,
      isprimary: index === 0 ? "1" : "0",
    })),
    title: "Get Photos Test",
    sortingOptionId: "manual-add-to-end",
    page: 1,
    pages: 1,
    perpage: 500,
    perPage: 500,
    total: 3,
  } satisfies GetPhotosResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);
});

it("should be able to filter by privacy", async () => {
  const operationResult = await getPhotos({
    credentials,
    userId: user.nsid,
    photosetId,
    privacyFilter: GetPhotosPrivacyFilter.FriendsAndFamily,
  });

  const expected = {
    id: photosetId,
    primary: photoIds[0],
    owner: user.nsid,
    ownername: user.name,
    photo: [
      {
        id: photoIds[0],
        secret: expect.any(String),
        server: expect.any(String),
        farm: expect.any(Number),
        title: expect.any(String),
        ispublic: 0,
        isfriend: 1,
        isfamily: 1,
        isprimary: "1",
      },
    ],
    title: "Get Photos Test",
    sortingOptionId: "manual-add-to-end",
    page: 1,
    pages: 1,
    perpage: 500,
    perPage: 500,
    total: 1,
  } satisfies GetPhotosResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);
});

it("should be able to get with photo extras", async () => {
  const operationResult = await getPhotos({
    credentials,
    userId: user.nsid,
    photosetId,
    page: 1,
    perPage: 1,
    extras: [
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
    id: photosetId,
    primary: photoIds[0],
    owner: user.nsid,
    ownername: user.name,
    photo: [
      {
        id: photoIds[0],
        secret: expect.any(String),
        server: expect.any(String),
        farm: expect.any(Number),
        title: expect.any(String),
        ispublic: 0,
        isfriend: 1,
        isfamily: 1,
        isprimary: "1",
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
    ],
    title: "Get Photos Test",
    sortingOptionId: "manual-add-to-end",
    page: "1",
    pages: 3,
    perpage: "1",
    perPage: "1",
    total: 3,
  } satisfies GetPhotosResponse;

  // check if the response context matches expected schema
  expect(operationResult).toStrictEqual(expected);
});
