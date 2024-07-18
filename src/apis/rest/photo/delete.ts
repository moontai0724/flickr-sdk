import { requestRest } from "common/request";

export interface DeleteOptions extends WithOAuthCredentials {
  /**
   * The id of the photo to delete.
   */
  photoId: string;
}

export interface DeleteResponse {}

/**
 * Delete a photo from flickr.
 *
 * @see https://www.flickr.com/services/api/flickr.photos.delete.html
 */
export async function deletePhoto(options: DeleteOptions) {
  const { credentials, photoId } = options;

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
