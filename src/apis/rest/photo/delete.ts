import { requestRest } from "common/request";
import type { WithOAuthCredentials } from "types";

export interface DeleteOptions extends WithOAuthCredentials {
  /**
   * The id of the photo to delete.
   */
  photoId: string;
}

export type DeleteResponse = void;

/**
 * Delete a photo from flickr.
 *
 * This method requires authentication with 'delete' permission.
 *
 * @returns empty success response if it completes without error.
 *
 * @see https://www.flickr.com/services/api/flickr.photos.delete.html
 */
export async function deletePhoto({ credentials, photoId }: DeleteOptions) {
  return requestRest<DeleteResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photos.delete",
      photo_id: photoId,
    },
    key: "photo",
  });
}
