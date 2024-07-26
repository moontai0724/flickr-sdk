import { prepareParams } from "common/request";
import type { WithCredentials } from "types";

export enum UploadSafetyLevel {
  Safe = 1,
  Moderate = 2,
  Restricted = 3,
}

export enum UploadContentType {
  Photo = 1,
  Screenshot = 2,
  Other = 3,
}

export interface UploadOptions extends WithCredentials {
  /**
   * The photo to upload.
   */
  photo: File;
  /**
   * The title of the photo.
   */
  title?: string;
  /**
   * A description of the photo. May contain some limited HTML.
   */
  description?: string;
  /**
   * A list of tags to apply to the photo.
   */
  tags?: string[];
  /**
   * Specifies who can view the photo. If omitted permissions will be set to
   * user's default
   */
  isPublic?: boolean;
  /**
   * Specifies who can view the photo. If omitted permissions will be set to
   * user's default
   */
  isFriend?: boolean;
  /**
   * Specifies who can view the photo. If omitted permissions will be set to
   * user's default
   */
  isFamily?: boolean;
  /**
   * Set to 1 for Safe, 2 for Moderate, or 3 for Restricted. If omitted or an
   * invalid value is passed, will be set to user's default
   */
  safetyLevel?: UploadSafetyLevel;
  /**
   * Set to 1 for Photo, 2 for Screenshot, or 3 for Other. If omitted , will be
   * set to user's default
   */
  contentType?: UploadContentType;
  /**
   * Set to false to keep the photo in global search results, true to hide from
   * public searches. If omitted, will be set based to user's default.
   */
  hidden?: boolean;
  /**
   * @see https://www.flickr.com/services/api/upload.async.html
   */
  async?: boolean;
}

export type UploadResponse = string;

async function handleResponse(response: Response, async?: number) {
  const text = await response.text();
  const id = text.match(
    async ? /<ticketid>([\w-]+)<\/ticketid>/ : /<photoid>(\d+)<\/photoid>/,
  )?.[1];

  if (!id) return Promise.reject(text);

  return id;
}

/**
 * Uploading Photos.
 *
 * Uploading apps can call the
 * [flickr.people.getUploadStatus](https://www.flickr.com/services/api/flickr.people.getUploadStatus.html)
 * method in the regular API to obtain file and bandwidth limits for the user.
 *
 * @returns The photo ID of the uploaded photo. If async is true, the ticket ID.
 *
 * @see https://www.flickr.com/services/api/upload.api.html
 */
export async function upload({
  credentials,
  photo,
  title,
  description,
  tags = [],
  isPublic,
  isFriend,
  isFamily,
  safetyLevel,
  contentType,
  hidden,
  async,
}: UploadOptions): Promise<UploadResponse> {
  const endpoint = "https://up.flickr.com/services/upload";

  const params = {
    title,
    description,
    // The document says tags should be space-separated, but seems
    // comma-separated is works better. The comma-separated tags could include
    // spaces.
    tags: tags.length ? tags.join(",") : undefined,
    is_public: isPublic !== undefined ? +isPublic : undefined,
    is_friend: isFriend !== undefined ? +isFriend : undefined,
    is_family: isFamily !== undefined ? +isFamily : undefined,
    safety_level: safetyLevel,
    content_type: contentType,
    // 1 for global, 2 for hidden
    hidden: hidden !== undefined ? +hidden + 1 : undefined,
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
