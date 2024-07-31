import { requestRest } from "common/request";
import type { PhotoSet, WithOAuthCredentials } from "types";

export interface EditMetaOptions extends WithOAuthCredentials {
  /**
   * The id of the photoset to modify.
   */
  photosetId: string;
  /**
   * The new title for the photoset.
   */
  title: string;
  /**
   * A description of the photoset. May contain limited html.
   */
  description?: string;
}

export interface EditMetaResponse
  extends Pick<PhotoSet, "id" | "title" | "description"> {}

/**
 * Modify the meta-data for a photoset.
 *
 * This method requires authentication with 'write' permission.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.editMeta.html
 */
export async function editMeta({
  credentials,
  photosetId,
  title,
  description,
}: EditMetaOptions) {
  return requestRest<EditMetaResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photosets.editMeta",
      photoset_id: photosetId,
      title,
      description,
    },
    key: "photoset",
  });
}
