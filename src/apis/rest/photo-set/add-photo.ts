import { requestRest } from "common/request";
import type { SuccessWithoutBodyResponse, WithOAuthCredentials } from "types";

export interface AddPhotoOptions extends WithOAuthCredentials {
  /**
   * The id of the photoset to add a photo to.
   */
  photosetId: string;
  /**
   * The id of the photo to add to the set.
   */
  photoId: string;
}

export interface AddPhotoResponse extends SuccessWithoutBodyResponse {}

/**
 * Add a photo to the end of an existing photoset.
 *
 * This method requires authentication with 'write' permission.
 *
 * @returns empty success response if it completes without error.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.addPhoto.html
 */
export async function addPhoto({
  credentials,
  photosetId,
  photoId,
}: AddPhotoOptions) {
  return requestRest<AddPhotoResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photosets.addPhoto",
      photoset_id: photosetId,
      photo_id: photoId,
    },
  });
}
