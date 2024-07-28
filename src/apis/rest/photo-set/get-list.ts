import { requestRest } from "common/request";
import type { License, Paginated, PhotoSet, WithCredentials } from "types";

export type PrimaryPhotoExtras =
  | "license"
  | "date_upload"
  | "date_taken"
  | "owner_name"
  | "icon_server"
  | "original_format"
  | "last_update"
  | "geo"
  | "tags"
  | "machine_tags"
  | "o_dims"
  | "views"
  | "media"
  | "path_alias"
  | "url_sq"
  | "url_t"
  | "url_s"
  | "url_m"
  | "url_o";

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
  primaryPhotoExtras?: (PrimaryPhotoExtras | (string & NonNullable<unknown>))[]; // preserve possibility to any string
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

interface ListPhotoSetItem extends PhotoSet {
  primaryPhotoExtras?: {
    license: License;
    /**
     * Unix timestamp of when the photo was uploaded.
     * @example 1683055233
     * @see https://www.flickr.com/services/api/misc.dates.html
     */
    dateupload: string;
    /**
     * Unix timestamp of when the photo was last updated.
     * @example 1683055302
     * @see https://www.flickr.com/services/api/misc.dates.html
     */
    lastupdate: string;
    /**
     * Date time when the photo was taken in (From Official) MySQL `datetime` format.
     * @example "2023-04-30 17:59:44"
     * @see https://www.flickr.com/services/api/misc.dates.html
     */
    datetaken: "2022-12-10 18:27:37";
    /**
     * (From Official) The accuracy to which we know the date to be true. At present, the following granularities are used:
     * - 0: Y-m-d H:i:s
     * - 4: Y-m
     * - 6: Y
     * - 8: Circa...
     */
    datetakengranularity: number;
    datetakenunknown: string;
    /**
     * The display name of the user account of the owner of the set.
     * @example "月太げつたい"
     */
    ownername: string;
    /**
     * The server id to access the photo.
     * @example "65535"
     * @see https://www.flickr.com/services/api/misc.urls.html
     */
    iconserver: string;
    /**
     * The icon farm id of the photo.
     * @example 66
     * @see https://www.flickr.com/services/api/misc.buddyicons.html
     */
    iconfarm: string;
    /**
     * The number of views of the photo.
     * @example 550
     */
    views: number;
    /**
     * Space separated list of tags.
     * @example "cosplay pf pf38"
     */
    tags: string;
    machineTags: string;
    /**
     * The secret key to get the original photo.
     * @example "a22165bf3f"
     * @see https://www.flickr.com/services/api/misc.urls.html
     */
    originalsecret: string;
    /**
     * @example "jpg"
     */
    originalformat: string;
    /**
     * seems to be 0 if unknown
     */
    latitude: number;
    /**
     * seems to be 0 if unknown
     */
    longitude: number;
    /**
     * seems to be 0 if unknown
     */
    accuracy: number;
    /**
     * seems to be 0 if unknown
     */
    context: number;
    /**
     * @example "photo"
     */
    media: string;
    /**
     * @example "ready"
     */
    mediaStatus: string;
    /**
     * Direct image url to the sq (square thumbnail) size of the photo.
     * @example "https://live.staticflickr.com/65535/52865522979_5c6b5e0405_s.jpg"
     */
    urlSq: string;
    /**
     * The height of the sq (square thumbnail) size of the photo.
     * @example 75
     */
    heightSq: number;
    /**
     * The width of the sq (square thumbnail) size of the photo.
     * @example 75
     */
    widthSq: number;
    /**
     * Direct image url to the t (thumbnail) size of the photo.
     * @example "https://live.staticflickr.com/65535/52865522979_5c6b5e0405_t.jpg"
     */
    urlT: string;
    /**
     * The height of the t (thumbnail) size of the photo.
     * @example 67
     */
    heightT: number;
    /**
     * The width of the t (thumbnail) size of the photo.
     * @example 100
     */
    widthT: number;
    /**
     * Direct image url to the s (small) size of the photo.
     * @example "https://live.staticflickr.com/65535/52865522979_5c6b5e0405_m.jpg"
     */
    urlS: string;
    /**
     * The height of the s (small) size of the photo.
     * @example 160
     */
    heightS: number;
    /**
     * The width of the s (small) size of the photo.
     * @example 240
     */
    widthS: number;
    /**
     * Direct image url to the m (medium) size of the photo.
     * @example "https://live.staticflickr.com/65535/52865522979_5c6b5e0405_m.jpg"
     */
    urlM: string;
    /**
     * The height of the m (medium) size of the photo.
     * @example 333
     */
    heightM: number;
    /**
     * The width of the m (medium) size of the photo.
     * @example 500
     */
    widthM: number;
    /**
     * Direct image url to the o (original) size of the photo.
     * @example "https://live.staticflickr.com/65535/52865522979_a22165bf3f_o.jpg"
     */
    urlO: string;
    /**
     * The height of the o (original) size of the photo.
     * @example 4000
     */
    heightO: number;
    /**
     * The width of the o (original) size of the photo.
     * @example 6000
     */
    widthO: number;
    /**
     * Should be the user alias ID of the owner of the set.
     * @example "moontai0724"
     */
    pathalias: string;
  };
  /**
   * A list of photo ids. If specified, each returned set will include a list of
   * these photo ids that are present in the set as "has_requested_photos"
   */
  hasRequestedPhotos?: string[];
}

export interface GetListResponse extends Paginated {
  cancreate: boolean;
  /**
   * List of photosets.
   *
   * Photosets are returned in the user's specified order, which may not mean
   * the newest set is first. Applications displaying photosets should respect
   * the user's ordering.
   */
  photoset: ListPhotoSetItem[]; // TODO: make this type correspond to the request
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
