import { requestRest } from "common/request";
import type { SuccessWithoutBodyResponse, WithOAuthCredentials } from "types";

export interface EditPhotosOptions extends WithOAuthCredentials {
  /**
   * The id of the photoset to modify. The photoset must belong to the calling
   * user.
   */
  photosetId: string;
  /**
   * The id of the photo to use as the 'primary' photo for the set. This id must
   * also be passed along in photo_ids list argument.
   */
  primaryPhotoId: string;
  /**
   * A list of photo ids to include in the set. They will appear
   * in the set in the order sent. This list must contain the primary photo id.
   * All photos must belong to the owner of the set. This list of photos
   * replaces the existing list. Call flickr.photosets.addPhoto to append a
   * photo to a set.
   *
   * Note. It could contain photos which are currently not in the photoset.
   */
  photoIds: string[];
}

export interface EditPhotosResponse extends SuccessWithoutBodyResponse {}

/**
 * Modify the photos in a photoset. Use this method to add, remove and re-order
 * photos.
 *
 * This method requires authentication with 'write' permission.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.editPhotos.html
 */
export async function editPhotos({
  credentials,
  photosetId,
  primaryPhotoId,
  photoIds,
}: EditPhotosOptions) {
  return requestRest<EditPhotosResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photosets.editPhotos",
      photoset_id: photosetId,
      primary_photo_id: primaryPhotoId,
      photo_ids: photoIds.join(","),
    },
  });
}
