import type { License } from "./license";

export interface PhotoExtras {
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
  datetaken: string;
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
  iconfarm: string | number;
  /**
   * The number of views of the photo.
   * @example 550
   */
  views: string;
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
  pathalias: string | null;
}
