import { prepareParams } from "common/request";
import type { WithCredentials } from "types";

export interface ReplaceOptions extends WithCredentials {
  /**
   * The file to upload.
   */
  photo: File;
  /**
   * The ID of the photo to replace.
   */
  photoId: string;
  /**
   * Photos may be replaced in async mode, for applications that don't want to
   * wait around for an upload to complete, leaving a socket connection open the
   * whole time. Processing photos asynchronously is recommended. Please
   * [consult the
   * documentation](https://www.flickr.com/services/api/upload.async.html) for
   * details.
   *
   * @see https://www.flickr.com/services/api/replace.async.html
   */
  async?: boolean;
}

export interface ReplaceSyncResponse {
  photoId?: string;
  secret?: string;
  originalSecret?: string;
}

function parsePhotoInformation(text: string): ReplaceSyncResponse {
  const results = text.match(
    /<photoid( secret="(?<secret>[\w]+?)")?( originalsecret="(?<originalSecret>[\w]+?)")?>(?<photoId>\d+)<\/photoid>/,
  );

  return {
    photoId: results?.groups?.photoId,
    secret: results?.groups?.secret,
    originalSecret: results?.groups?.originalSecret,
  };
}

export interface ReplaceAsyncResponse {
  ticketId?: string;
}

function parseTicketInformation(text: string): ReplaceAsyncResponse {
  const results = text.match(/<ticketid>([\w-]+)<\/ticketid>/);

  return {
    ticketId: results?.[1],
  };
}

async function handleResponse(response: Response, async?: number) {
  const text = await response.text();
  const info = async
    ? parseTicketInformation(text)
    : parsePhotoInformation(text);

  if (!info) return Promise.reject(text);

  return info;
}

export type ReplaceResponse = ReplaceSyncResponse | ReplaceAsyncResponse;

/**
 * Replacing Photos.
 *
 * Uploading apps can call the
 * [flickr.people.getUploadStatus](https://www.flickr.com/services/api/flickr.people.getUploadStatus.html)
 * method in the regular API to obtain file and bandwidth limits for the user.
 *
 * @returns The photo ID of the replaceed photo. If async is true, the ticket
 * ID.
 *
 * @see https://www.flickr.com/services/api/replace.api.html
 */
export async function replace<P extends ReplaceOptions>({
  credentials,
  photo,
  photoId,
  async,
}: P): Promise<
  P extends { async: true } ? ReplaceAsyncResponse : ReplaceSyncResponse
>;
export async function replace({
  credentials,
  photo,
  photoId,
  async,
}: ReplaceOptions): Promise<ReplaceResponse> {
  const endpoint = "https://up.flickr.com/services/replace";

  const params = {
    photo_id: photoId,
    async: async !== undefined ? +async : undefined,
  };
  const oauthParams = await prepareParams({
    credentials,
    method: "POST",
    endpoint,
    params,
    setJsonFormat: false,
  });

  const body = new FormData();

  oauthParams.forEach((value, key) => body.append(key, value));
  body.append("photo", photo);

  const response = await fetch(endpoint, {
    method: "POST",
    body,
  }).then((res) => handleResponse(res, params.async));

  return response;
}
