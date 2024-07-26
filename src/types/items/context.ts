import { type License } from "types/items/license";
import { type NumericBoolean } from "types/numberic-boolean";

export interface NoContext {
  id: 0;
  isFaved: 0;
}

export interface PhotoContext {
  /**
   * The id of the photo.
   * @example "52865522979"
   */
  id: string;
  /**
   * The NSID of the owner.
   * @example "140551311@N06"
   */
  owner: string;
  /**
   * The secret key to get the photo.
   * @example "5c6b5e0405"
   * @see https://www.flickr.com/services/api/misc.urls.html
   */
  secret: string;
  /**
   * The server id to access the photo.
   * @example 65535
   * @see https://www.flickr.com/services/api/misc.urls.html
   */
  server: string;
  /**
   * The icon farm id of the owner user profile photo.
   * @example 66
   * @see https://www.flickr.com/services/api/misc.buddyicons.html
   */
  farm: number;
  /**
   * The title of the photo.
   * @example "月太-0576"
   */
  title: string;
  /**
   * The path url to the photo page.
   * @example "/photos/moontai0724/52865522979/in/set-72177720307975344/"
   */
  url: string;
  /**
   * The url to the photo thumbnail.
   * @example "https://live.staticflickr.com/65535/52865745940_529efbf57f_s.jpg"
   */
  thumb: string;
  license: License;
  /**
   * @example "photo"
   * @example "video"
   */
  media: string;
  isFaved: NumericBoolean;
}

export type Context = PhotoContext | NoContext;
