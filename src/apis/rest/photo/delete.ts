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
 *
 * @throws `1: Photo not found`: The photo id was not the id of a photo belonging to the calling user.
 * @throws `95: SSL is required`: SSL is required to access the Flickr API.
 * @throws `96: Invalid signature`: The passed signature was invalid.
 * @throws `97: Missing signature`: The call required signing but no signature was sent.
 * @throws `98: Login failed / Invalid auth token`: The login details or auth token passed were invalid.
 * @throws `99: User not logged in / Insufficient permissions`: The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions.
 * @throws `100: Invalid API Key`: The API key passed was not valid or has expired.
 * @throws `105: Service currently unavailable`: The requested service is temporarily unavailable.
 * @throws `106: Write operation failed`: The requested operation failed due to a temporary issue.
 * @throws `111: Format "xxx" not found`: The requested response format was not found.
 * @throws `112: Method "xxx" not found`: The requested method was not found.
 * @throws `114: Invalid SOAP envelope`: The SOAP envelope send in the request could not be parsed.
 * @throws `115: Invalid XML-RPC Method Call`: The XML-RPC request document could not be parsed.
 * @throws `116: Bad URL found`: One or more arguments contained a URL that has been used for abuse on Flickr.
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
