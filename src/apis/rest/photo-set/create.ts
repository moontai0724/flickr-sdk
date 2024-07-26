import { requestRest } from "common/request";
import type { PhotoSet, WithOAuthCredentials } from "types";

export interface CreateOptions extends WithOAuthCredentials {
  /**
   * A title for the photoset.
   */
  title: string;
  /**
   * A description of the photoset. May contain limited html.
   */
  description?: string;
  /**
   * The id of the photo to represent this set. The photo must belong to the calling user.
   */
  primaryPhotoId: string;
}

export interface CreateResponse extends Pick<PhotoSet, "id"> {
  /**
   * The url to the photoset page.
   */
  url: string;
}

/**
 * Create a new photoset for the calling user.
 *
 * This method requires authentication with 'write' permission.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.create.html
 */
export async function create(options: CreateOptions) {
  const { credentials, title, description, primaryPhotoId } = options;

  return requestRest<CreateResponse>({
    credentials,
    params: {
      method: "flickr.photosets.create",
      title,
      description,
      primary_photo_id: primaryPhotoId,
    },
    key: "photoset",
  });
}
