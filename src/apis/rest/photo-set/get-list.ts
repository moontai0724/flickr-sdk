import { requestRest } from "common/request";
import type { PhotoSet } from "types/items";

export interface GetListOptions extends WithApiKey {
  /**
   * The page of results to get. Currently, if this is not provided, all sets
   * are returned, but this behaviour may change in future.
   */
  page?: number;
  /**
   * The number of sets to get per page. If paging is enabled, the maximum
   * number of sets per page is 500.
   */
  perPage?: number;
  /**
   * A comma-separated list of photo ids. If specified, each returned set will
   * include a list of these photo ids that are present in the set as
   * "has_requested_photos"
   */
  photoIds?: string;
  /**
   * A comma-delimited list of extra information to fetch for the primary photo.
   * Currently supported fields are: `license`, `date_upload`, `date_taken`,
   * `owner_name`, `icon_server`, `original_format`, `last_update`, `geo`,
   * `tags`, `machine_tags`, `o_dims`, `views`, `media`, `path_alias`, `url_sq`,
   * `url_t`, `url_s`, `url_m`, `url_o`
   */
  primaryPhotoExtras?: string;
  /**
   * A comma-separated list of groups used to sort the output sets. If has_photo
   * is present, any of the calling user's galleries containing photos referred
   * to in photo_ids will be returned before other galleries. The order of the
   * sort_groups will dictate the order that the groups are returned in. Only
   * available if continuation is used. The resulting output will include a
   * "sort_group" parameter indicating the sort_group that each set is part of,
   * or null if not applicable
   */
  sortGroups?: string;
  /**
   * The NSID of the user to get a photoset list for. If none is specified, the
   * calling user is assumed.
   */
  userId?: string;
}

export interface GetListResponse extends Paginated {
  /**
   * List of photosets.
   *
   * Photosets are returned in the user's specified order, which may not mean
   * the newest set is first. Applications displaying photosets should respect
   * the user's ordering.
   */
  photoset: PhotoSet[];
}

/**
 * Returns the photosets belonging to the specified user.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.getList.html
 *
 * @throws `1: User not found`: The user NSID passed was not a valid user NSID and the calling user was not logged in.
 * @throws `2: Continuation key is invalid or expired`: The continuation key passed was not valid or has already expired.
 * @throws `100: Invalid API Key`: The API key passed was not valid or has expired.
 * @throws `105: Service currently unavailable`: The requested service is temporarily unavailable.
 * @throws `106: Write operation failed`: The requested operation failed due to a temporary issue.
 * @throws `111: Format "xxx" not found`: The requested response format was not found.
 * @throws `112: Method "xxx" not found`: The requested method was not found.
 * @throws `114: Invalid SOAP envelope`: The SOAP envelope send in the request could not be parsed.
 * @throws `115: Invalid XML-RPC Method Call`: The XML-RPC request document could not be parsed.
 * @throws `116: Bad URL found`: One or more arguments contained a URL that has been used for abuse on Flickr.
 */
export async function getList(options: GetListOptions) {
  const {
    page,
    perPage,
    photoIds,
    primaryPhotoExtras,
    sortGroups,
    userId,
    apiKey,
  } = options;

  return requestRest<GetListResponse>(
    {
      method: "flickr.photosets.getList",
      api_key: apiKey,
      page: page ? page.toString() : undefined,
      per_page: perPage ? perPage.toString() : undefined,
      photo_ids: photoIds || undefined,
      primary_photo_extras: primaryPhotoExtras || undefined,
      sort_groups: sortGroups || undefined,
      user_id: userId || undefined,
    },
    "photosets",
  );
}
