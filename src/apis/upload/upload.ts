import { prepareParams } from "common/request";

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
}

export interface UploadResponse {}

/**
 * Uploading Photos.
 *
 * Uploading apps can call the
 * [flickr.people.getUploadStatus](https://www.flickr.com/services/api/flickr.people.getUploadStatus.html)
 * method in the regular API to obtain file and bandwidth limits for the user.
 *
 * @see https://www.flickr.com/services/api/upload.api.html
 *
 * @returns The photo ID of the uploaded photo.
 *
 * @throws `0: Video uploads are temporarily disabled`
 * @throws `2: No photo specified`: The photo required argument was missing.
 * @throws `3: General upload failure`: The file was not correctly uploaded.
 * @throws `4: Filesize was zero`: The file was zero bytes in length.
 * @throws `5: Filetype was not recognised`: The file was not of a recognised image format.
 * @throws `6: Upload limit reached. For more info, visit flickr.com/pro`: The calling user has reached the upload limit for free accounts.
 * @throws `7: User exceeded video upload limit8: Filesize was too large9: Duplicate photo/video detected`: The uploaded photo or video was identified as a duplicate within the user's account. Only applies if dedup_check = 1 or dedup_check = 2. Will also return duplicate_photo_id and duplicate_photo_status values
 * @throws `10: Not a valid url to upload from`: The external_image_link URL is not a valid flickr farm URL
 * @throws `11: Fetch from external image failed`: A valid image could not be fetched from the external_image_link URL
 * @throws `12: Not a valid photo id to clone meta data from`: The photo id specified in the clone_meta_from_photo_id parameter is not valid
 * @throws `13: The clone photo does not belong to the uploader`: The photo id specified in the clone_meta_from_photo_id parameter does not belong to the uploading user
 * @throws `14: Auto Upload disabled for Non pro User/Server at capacity`: The upload is not processed either due to capacity limits on the flickr side, or because the upload appears to be from a desktop uploadr (i.e. bulk = 1) and the user is not a pro. non_pro_desktop_upload_wait_time parameter will be included in the return with the number of seconds the client should wait before retrying
 * @throws `15: Non-safe content not allowed`: Non-safe content is not allowed for free accounts.
 * @throws `95: SSL is required`: SSL is required to access the Flickr API.
 * @throws `96: Invalid signature`: The passed signature was invalid.
 * @throws `97: Missing signature`: The call required signing but no signature was sent.
 * @throws `98: Login failed / Invalid auth token`: The login details or auth token passed were invalid.
 * @throws `99: User not logged in / Insufficient permissions`: The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions.
 * @throws `100: Invalid API Key`: The API key passed was not valid or has expired.
 * @throws `105: Service currently unavailable`: The requested service is temporarily unavailable.
 * @throws `106: Write operation failed`: The requested operation failed due to a temporary issue.
 * @throws `116: Bad URL found`: One or more arguments contained a URL that has been used for abuse on Flickr.
 */
export async function upload(
  options: UploadOptions,
): Promise<string | null | undefined> {
  const endpoint = "https://up.flickr.com/services/upload";

  const {
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
  } = options;

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
  };
  const oauthParams = await prepareParams({
    credentials,
    method: "POST",
    endpoint,
    params,
    setJsonFormat: false,
  });

  const body = new FormData();

  body.append("photo", photo);
  oauthParams.forEach((value, key) => body.append(key, value));

  const response = await fetch(endpoint, {
    method: "POST",
    body,
  }).then(async (payload) => {
    const text = await payload.text();
    const photoId = text.match(/<photoid>(\d+)<\/photoid>/)?.[1];

    if (!photoId) return Promise.reject(text);

    return photoId;
  });

  return response;
}
