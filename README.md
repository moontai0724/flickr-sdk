# @moontai0724/flickr-sdk

[![NPM Version](https://img.shields.io/npm/v/@moontai0724/flickr-sdk)](https://www.npmjs.com/package/@moontai0724/flickr-sdk)
[![NPM Downloads](https://img.shields.io/npm/d18m/@moontai0724/flickr-sdk)](https://www.npmjs.com/package/@moontai0724/flickr-sdk)
[![Codecov](https://codecov.io/gh/moontai0724/flickr-sdk/graph/badge.svg)](https://codecov.io/gh/moontai0724/flickr-sdk)

[WIP] A TypeScript SDK for Flickr API.

Currently this SDK implements following apis:

- OAuth.\*
- Upload.\*
- Rest
  - photosets.\*
  - photos
    - photos.upload.\*
    - photos.getInfo
    - photos.getSizes
    - photos.setMeta

## Install

### NPM

```bash
npm install @moontai0724/flickr-sdk
```

### Yarn

```bash
yarn add @moontai0724/flickr-sdk
```

### PNPM

```bash
pnpm add @moontai0724/flickr-sdk
```

## API Document

You can see the [API documentation](https://moontai0724.github.io/flickr-sdk/)
to know more about all implementations in this SDK.

## Usage

### Overview

#### `flickrApis`

This includes pure api implementations without additional features but modified the response keys to camelCase. All apis are independent implementations and can be used separately.

It contains the following sub-objects:

- `auth`: oauth authorization related apis
- `upload`: upload items related apis
- `rest`: all other apis

### Rest

```typescript
import { flickrApis } from "@moontai0724/flickr-sdk";

flickrApis.rest.photosets
  .getList({
    credentials: { apiKey: "..." },
    userId: "140551311@N06",
  })
  .then(console.log)
  .catch(console.error);
/*
{
  page: 1,
  pages: 1,
  perpage: 500,
  total: 8,
  photoset: [
    {
      id: '72177720309455960',
      ...
      title: 'SONY IER-M9',
      description: '',
      canComment: 0,
      dateCreate: '1688200478',
      dateUpdate: '1722222710',
      ...
    },
    ...
  ]
}
 */
```

### OAuth

To use apis with authorization, you should follows the guide on
[Flickr](https://www.flickr.com/services/api/auth.oauth.html). In order to get
the tokens for user, you have to use apis in this collection to request the
token.

To request the token and construct the url for user to authorize the app:

```typescript
import { flickrApis } from "@moontai0724/flickr-sdk";

const oauth = await flickrApis.auth.requestToken(
  apiKey,
  consumerSecret,
  "https://example.com/oauth-callback",
);

console.log("Got 1st oauth token: ", oauth);
/*
Got 1st oauth token: {
  oauthToken: "...",
  oauthTokenSecret: "...",
}
 */

const authorizeUrl = flickrApis.auth.constructAuthUrl(oauthToken, "delete");

console.log("Please click the link and authorize the app: ", authorizeUrl);
// https://www.flickr.com/services/oauth/authorize?oauth_token=abc-123&perms=delete
```

After user authorized the app, it will have a verifier in the redirected url.
Use it to get the permanent user oauth token:

```typescript
import { flickrApis } from "@moontai0724/flickr-sdk";

const result = await flickrApis.auth.accessToken(
  apiKey,
  consumerSecret,
  oauthToken, // from the 1st step
  oauthTokenSecret, // from the 1st step
  verifier, // from the callback url
);

console.log("Got user oauth token: ", result);
/*
Got user oauth token: {
  oauthToken: "...",
  oauthTokenSecret: "...",
  ...
}
 */
```

### Upload

To upload or replace photos, you can to use this collection.

```typescript
import { flickrApis } from "@moontai0724/flickr-sdk";

flickrApis.upload
  .upload({
    credentials: {
      apiKey: "...", // application key
      consumerSecret: "...", // application secret
      oauthToken: "...", // user oauth token
      oauthTokenSecret: "...", // user oauth token
    },
    photo: new File(["..."], "..."), // photo file
  })
  .then(console.log)
  .catch(console.error);
```
