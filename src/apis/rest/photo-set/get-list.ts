import { requestRest } from "common/request";
import type {
  NumericBoolean,
  Paginated,
  PhotoExtras,
  PhotoExtrasOption,
  PhotoSet,
  WithCredentials,
} from "types";

export interface GetListOptions extends WithCredentials {
  /**
   * The NSID of the user to get a photoset list for. If none is specified, the
   * calling user is assumed.
   */
  userId?: string;
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
   * A list of extra information to fetch for the primary photo.
   */
  primaryPhotoExtras?: PhotoExtrasOption[];
  /**
   * A list of photo ids. If specified, each returned set will include a list of
   * these photo ids that are present in the set as "has_requested_photos"
   */
  photoIds?: string[];
  /**
   * A list of groups used to sort the output sets. If has_photo
   * is present, any of the calling user's galleries containing photos referred
   * to in photo_ids will be returned before other galleries. The order of the
   * sort_groups will dictate the order that the groups are returned in. Only
   * available if continuation is used. The resulting output will include a
   * "sort_group" parameter indicating the sort_group that each set is part of,
   * or null if not applicable
   */
  sortGroups?: string[];
}

interface GetListPhotoExtras extends PhotoExtras {
  iconfarm: number;
}

interface GetListPhotosetItem extends PhotoSet {
  primaryPhotoExtras?: GetListPhotoExtras;
  /**
   * A list of photo ids. If specified, each returned set will include a list of
   * these photo ids that are present in the set as "has_requested_photos"
   */
  hasRequestedPhotos?: string[];
}

export interface GetListResponse extends Paginated {
  cancreate: NumericBoolean;
  /**
   * List of photosets.
   *
   * Photosets are returned in the user's specified order, which may not mean
   * the newest set is first. Applications displaying photosets should respect
   * the user's ordering.
   */
  photoset: GetListPhotosetItem[]; // TODO: make this type correspond to the request
}

/**
 * Returns the photosets belonging to the specified user.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.getList.html
 */
export async function getList({
  credentials,
  page,
  perPage,
  photoIds,
  primaryPhotoExtras,
  sortGroups,
  userId,
}: GetListOptions) {
  return requestRest<GetListResponse>({
    credentials,
    params: {
      method: "flickr.photosets.getList",
      page: page?.toString(),
      per_page: perPage?.toString(),
      photo_ids: photoIds?.join(","),
      primary_photo_extras: primaryPhotoExtras?.join(","),
      sort_groups: sortGroups?.join(","),
      user_id: userId,
    },
    key: "photosets",
  });
}
