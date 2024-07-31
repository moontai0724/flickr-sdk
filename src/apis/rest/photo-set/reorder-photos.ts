import { requestRest } from "common/request";
import type { SuccessWithoutBodyResponse, WithOAuthCredentials } from "types";

export interface ReorderPhotosOptions extends WithOAuthCredentials {
  /**
   * The id of the photoset to reorder. The photoset must belong to the calling
   * user.
   */
  photosetId: string;
  /**
   * Ordered list of photo ids. Photos that are not in the list will keep their
   * original order
   */
  photoIds: string[];
}

export interface ReorderPhotosResponse extends SuccessWithoutBodyResponse {}

/**
 * This method requires authentication with 'write' permission.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.reorderPhotos.html
 */
export async function reorderPhotos({
  credentials,
  photosetId,
  photoIds,
}: ReorderPhotosOptions) {
  return requestRest<ReorderPhotosResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photosets.reorderPhotos",
      photoset_id: photosetId,
      photo_ids: photoIds.join(","),
    },
  });
}
