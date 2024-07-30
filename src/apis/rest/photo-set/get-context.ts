import { requestRest } from "common/request";
import type {
  Context,
  SuccessWithoutBodyResponse,
  WithCredentials,
} from "types";

export interface GetContextOptions extends WithCredentials {
  /**
   * The id of the photo to fetch the context for.
   */
  photoId: string;
  /**
   * The id of the photoset for which to fetch the photo's context.
   */
  photosetId: string;
}

export interface GetContextResponse extends SuccessWithoutBodyResponse {
  /**
   * Total amount of items in the set.
   * @example "145"
   */
  count: string;
  prevphoto: Context;
  nextphoto: Context;
}

/**
 * Returns next and previous photos for a photo in a set.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.getContext.html
 */
export async function getContext({
  credentials,
  photoId,
  photosetId,
}: GetContextOptions) {
  return requestRest<GetContextResponse>({
    credentials,
    params: {
      method: "flickr.photosets.getContext",
      photo_id: photoId,
      photoset_id: photosetId,
    },
  });
}
