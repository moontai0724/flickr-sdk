import { requestRest } from "common/request";
import type { WithOAuthCredentials } from "types";

export interface RemovePhotosOptions extends WithOAuthCredentials {
  /**
   * The id of the photoset to remove photos from.
   */
  photosetId: string;
  /**
   * A list of photo ids to remove from the photoset.
   */
  photoIds: string[];
}

export type RemovePhotosResponse = void;

/**
 * Remove multiple photos from a photoset.
 *
 * This method requires authentication with 'write' permission.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.removePhotos.html
 */
export async function removePhotos({
  credentials,
  photosetId,
  photoIds,
}: RemovePhotosOptions) {
  return requestRest<RemovePhotosResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photosets.removePhotos",
      photoset_id: photosetId,
      photo_ids: photoIds.join(","),
    },
  });
}
