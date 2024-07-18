import { requestRest } from "common/request";
import type { Photo } from "types/items";

export interface GetInfoOptions extends WithCredentials {
  /**
   * The id of the photo to get information for.
   */
  photoId: string;
  /**
   * The secret for the photo. If the correct secret is passed then permissions
   * checking is skipped. This enables the 'sharing' of individual photos by
   * passing around the id and secret.
   */
  secret?: string;
}

export interface GetInfoResponse extends Photo {}

/**
 * Get information about a photo. The calling user must have permission to view
 * the photo.
 *
 * @see https://www.flickr.com/services/api/flickr.photos.getInfo.html
 *
 * @throws `1: Photo not found.`: The photo id was either invalid or was for a photo not viewable by the calling user.
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
  const { credentials, photoId, secret } = options;

  return requestRest<GetInfoResponse>({
    credentials,
    params: {
      method: "flickr.photos.getInfo",
      photo_id: photoId,
      secret: secret || undefined,
    },
    key: "photo",
  });
}
