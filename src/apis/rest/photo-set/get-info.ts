import { requestRest } from "common/request";
import type { PhotoSet, WithCredentials } from "types";

export interface GetInfoOptions extends WithCredentials {
  /**
   * The ID of the photoset to fetch information for.
   */
  photosetId: string;
  /**
   * The user_id here is the owner of the set passed in photoset_id.
   */
  userId: string;
}

export interface GetInfoResponse extends Omit<PhotoSet, "photos" | "videos"> {
  /**
   * Amount of **items** in the set. This includes photos and videos.
   * @example 63
   */
  photos: number;
}

/**
 * Gets information about a photoset.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.getInfo.html
 */
export async function getInfo({
  credentials,
  photosetId,
  userId,
}: GetInfoOptions) {
  return requestRest<GetInfoResponse>({
    credentials,
    params: {
      method: "flickr.photosets.getInfo",
      photoset_id: photosetId,
      user_id: userId,
    },
    key: "photoset",
  });
}
