import { requestRest } from "common/request";
import type { SuccessWithoutBodyResponse, WithOAuthCredentials } from "types";

export interface SetPrimaryPhotoOptions extends WithOAuthCredentials {
  /**
   * The id of the photoset to set primary photo to.
   */
  photosetId: string;
  /**
   * The id of the photo to set as primary.
   */
  photoId: string;
}

export interface SetPrimaryPhotoResponse extends SuccessWithoutBodyResponse {}

/**
 * Set photoset primary photo
 *
 * This method requires authentication with 'write' permission.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.setPrimaryPhoto.html
 */
export async function setPrimaryPhoto({
  credentials,
  photosetId,
  photoId,
}: SetPrimaryPhotoOptions) {
  return requestRest<SetPrimaryPhotoResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photosets.setPrimaryPhoto",
      photoset_id: photosetId,
      photo_id: photoId,
    },
  });
}
