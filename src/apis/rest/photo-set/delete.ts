import { requestRest } from "common/request";
import type { WithOAuthCredentials } from "types";

export interface DeleteOptions extends WithOAuthCredentials {
  /**
   * The id of the photoset to delete. It must be owned by the calling user.
   */
  photosetId: string;
}

export type DeleteResponse = void;

/**
 * Delete a photoset.
 *
 * This method requires authentication with 'write' permission.
 *
 * @returns empty success response if it completes without error.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.delete.html
 */
export async function deletePhotoset({
  credentials,
  photosetId,
}: DeleteOptions) {
  return requestRest<DeleteResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photosets.delete",
      photoset_id: photosetId,
    },
  });
}
