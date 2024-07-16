/* eslint-disable typescript-sort-keys/interface */
/**
 * The photoset object of the response.
 *
 * Comments for properties are guessed by the author of this library and may be
 * wrong.
 */
export interface PhotoSet {
  /**
   * The id of the photoset.
   * @example "72177720304407041"
   */
  id: string;
  /**
   * The user NSID of the owner of the set.
   * @example "140551311@N06"
   */
  owner: string;
  /**
   * The display name of the user account of the owner of the set.
   * @example "月太げつたい"
   */
  username: string;
  /**
   * The id of the cover photo of the set.
   * @example "52559793622"
   * @see https://www.flickr.com/services/api/misc.urls.html
   */
  primary: string;
  /**
   * The secret key to get the cover photo of the set.
   * @example "123ff75034"
   * @see https://www.flickr.com/services/api/misc.urls.html
   */
  secret: string;
  /**
   * The server id to access the photo.
   * @example 65535
   * @see https://www.flickr.com/services/api/misc.urls.html
   */
  server: number;
  /**
   * The icon farm id of the owner user profile photo.
   * @example 66
   * @see https://www.flickr.com/services/api/misc.buddyicons.html
   */
  farm: number;
  /**
   * @example "92"
   */
  countViews: string;
  /**
   * @example "0"
   */
  countComments: string;
  /**
   * @example 63
   */
  countPhotos: number;
  /**
   * @example 0
   */
  countVideos: number;
  /**
   * User defined title of the set.
   * @example "2022.12.10 巴哈姆特 26 周年站聚"
   */
  title: string;
  /**
   * User defined description of the set.
   * @example "2022.12.10 @ 台大綜合體育館 1F"
   */
  description: string;
  /**
   * @example 0
   */
  canComment: number;
  /**
   * Unix timestamp of when the set was created.
   * @example 1670903544
   * @see https://www.flickr.com/services/api/misc.dates.html
   */
  dateCreate: string;
  /**
   * Unix timestamp of the last update.
   * @example 1671299158
   * @see https://www.flickr.com/services/api/misc.dates.html
   */
  dateUpdate: string;
  /**
   * @example "manual-add-to-end"
   */
  sortingOptionId: string;
  /**
   * Amount of photos in the set.
   * @example 63
   */
  photos: number;
  /**
   * Amount of videos in the set.
   * @example 0
   */
  videos: number;
  /**
   * @example 1
   */
  visibilityCanSeeSet: number;
  /**
   * @example 0
   */
  needsInterstitial: number;
}
