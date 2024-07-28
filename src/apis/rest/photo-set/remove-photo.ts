import { requestRest } from "common/request";
import type { WithOAuthCredentials } from "types";

export interface RemovePhotoOptions extends WithOAuthCredentials {
  /**
   * The id of the photoset to remove a photo from.
   */
  photosetId: string;
  /**
   * The id of the photo to remove from the set.
   */
  photoId: string;
}

export type RemovePhotoResponse = void;

/**
 * Remove a photo from a photoset.
 *
 * This method requires authentication with 'write' permission.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.removePhoto.html
 */
export async function removePhoto({
  credentials,
  photosetId,
  photoId,
}: RemovePhotoOptions) {
  return requestRest<RemovePhotoResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photosets.removePhoto",
      photoset_id: photosetId,
      photo_id: photoId,
    },
  });
}
