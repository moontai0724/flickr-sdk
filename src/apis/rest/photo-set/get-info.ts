import { requestRest } from "common/request";
import type { PhotoSet } from "types/items";

export interface GetInfoOptions extends WithCredentials {
  /**
   * The ID of the photoset to fetch information for.
   */
  photoSetId: string;
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
 *
 * @throws `1: Photoset not found`: The photoset id was not valid.
 * @throws `2: User not found`:
 * @throws `100: Invalid API Key`: The API key passed was not valid or has expired.
 * @throws `105: Service currently unavailable`: The requested service is temporarily unavailable.
 * @throws `106: Write operation failed`: The requested operation failed due to a temporary issue.
 * @throws `111: Format "xxx" not found`: The requested response format was not found.
 * @throws `112: Method "xxx" not found`: The requested method was not found.
 * @throws `114: Invalid SOAP envelope`: The SOAP envelope send in the request could not be parsed.
 * @throws `115: Invalid XML-RPC Method Call`: The XML-RPC request document could not be parsed.
 * @throws `116: Bad URL found`: One or more arguments contained a URL that has been used for abuse on Flickr.
 */
export async function getInfo(options: GetInfoOptions) {
  const { credentials, photoSetId, userId } = options;

  return requestRest<GetInfoResponse>(
    credentials,
    {
      method: "flickr.photosets.getInfo",
      photoset_id: photoSetId,
      user_id: userId,
    },
    "photoset",
  );
}
