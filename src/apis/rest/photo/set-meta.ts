import { requestRest } from "common/request";

export interface SetMetaOptions extends WithOAuthCredentials {
  /**
   * The id of the photo to set information for.
   */
  photoId: string;
  /**
   * The title for the photo. At least one of title or description must be set.
   */
  title?: string;
  /**
   * The description for the photo. At least one of title or description must be
   * set.
   */
  description?: string;
}

export interface SetMetaResponse {
  /**
   * The modified title for the photo.
   */
  title: string;
  /**
   * The modified description for the photo.
   */
  description: string;
}

/**
 * Set the meta information for a photo.
 *
 * This method requires authentication with 'write' permission.
 *
 * @see https://www.flickr.com/services/api/flickr.photos.setMeta.html
 */
export async function setMeta(options: SetMetaOptions) {
  const { credentials, photoId, title, description } = options;

  return requestRest<SetMetaResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photos.setMeta",
      photo_id: photoId,
      title,
      description,
    },
    key: "photo",
  });
}
