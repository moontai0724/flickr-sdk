import { prepareParams } from "common/request";

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

export interface ReplaceResponse {}

function parsePhotoInformation(text: string) {
  const results = text.match(
    /<photoid( secret="(?<secret>[\w]+?)")?( originalsecret="(?<originalSecret>[\w]+?)")?>(?<photoId>\d+)<\/photoid>/,
  );

  return {
    photoId: results?.groups?.photoId,
    secret: results?.groups?.secret,
    originalSecret: results?.groups?.originalSecret,
  };
}

function parseTicketInformation(text: string) {
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

/**
 * Replacing Photos.
 *
 * Uploading apps can call the
 * [flickr.people.getUploadStatus](https://www.flickr.com/services/api/flickr.people.getUploadStatus.html)
 * method in the regular API to obtain file and bandwidth limits for the user.
 *
 * @see https://www.flickr.com/services/api/replace.api.html
 *
 * @returns The photo ID of the replaceed photo. If async is true, the ticket
 * ID.
 *
 * @throws `0: Video replaces are temporarily disabled`
 */
export async function replace(options: ReplaceOptions) {
  const endpoint = "https://up.flickr.com/services/replace";

  const { credentials, photo, photoId, async } = options;

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
