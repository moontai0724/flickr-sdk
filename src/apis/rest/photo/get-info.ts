import { requestRest } from "common/request";
import type { Photo, WithCredentials } from "types";

export interface GetInfoOptions extends WithCredentials {
  /**
   * The id of the photo to get information for.
   */
  photoId: string;
  /**
   * The secret for the photo. If the correct secret is passed then permissions
   * checking is skipped. This enables the 'sharing' of individual photos by
   * passing around the id and secret.
   */
  secret?: string;
}

export interface GetInfoResponse extends Photo {}

/**
 * Get information about a photo. The calling user must have permission to view
 * the photo.
 *
 * @see https://www.flickr.com/services/api/flickr.photos.getInfo.html
 */
export async function getInfo(options: GetInfoOptions) {
  const { credentials, photoId, secret } = options;

  return requestRest<GetInfoResponse>({
    credentials,
    params: {
      method: "flickr.photos.getInfo",
      photo_id: photoId,
      secret: secret || undefined,
    },
    key: "photo",
  });
}
