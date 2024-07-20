import type { NumericBoolean } from "types";

/**
 * The photo object of the response.
 *
 * Comments for properties are guessed by the author of this library and may be
 * wrong.
 */
export interface Photo {
  /**
   * The id of the photo.
   * @example "52865522979"
   */
  id: string;
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
   * Unix timestamp of when the photo was uploaded.
   * @example 1683055233
   * @see https://www.flickr.com/services/api/misc.dates.html
   */
  dateuploaded: string;
  /**
   * Whether the photo is marked as a favorite.
   *
   * (From official) The isfavorite attribute only makes sense for logged in
   * users who don't own the photo.
   *
   * @default 0
   * @example 0
   */
  isfavorite: NumericBoolean;
  /**
   * The order of the license of the photo.
   * @example "4"
   */
  license: string;
  /**
   * The order of the safety level of the photo.
   * @example "0"
   */
  safetyLevel: string;
  /**
   * (From official) The rotation attribute is the current clockwise rotation,
   * in degrees, by which the smaller image sizes differ from the original
   * image.
   */
  rotation: number;
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
  owner: {
    /** @example "140551311@N06" */
    nsid: string;
    /** @example "月太げつたい" */
    username: string;
    /** @example "" */
    realname: string;
    /** @example "New Tapiei City, Taiwan" */
    location: string;
    /** @example "65535" */
    iconserver: string;
    /** @example 66 */
    iconfarm: string;
    /** @example "moontai0724" */
    pathAlias: string;
    /**
     * Only present if the user is not the owner.
     */
    gift?: {
      giftEligible: boolean;
      /**
       * @example ["year", "month", "week"]
       */
      eligibleDurations: string[];
      newFlow: boolean;
    };
  };
  /**
   * The title of the photo.
   * @example "月太-0575"
   */
  title: string;
  /**
   * The description of the photo.
   * @example ""
   */
  description: string;
  visibility: {
    ispublic: NumericBoolean;
    isfriend: NumericBoolean;
    isfamily: NumericBoolean;
  };
  /**
   * (From Official) A photo which was taken some time in June 1980 would have a
   * taken date if `1980-06-01 00:00:00` and a granularity of 4. In the future,
   * additional granularities may be added, so for future compatability you
   * might want to build you application to accept any number between 0 and 10
   * for the granularity.
   */
  dates: {
    /**
     * Unix timestamp of when the photo was uploaded.
     * @example 1683055233
     * @see https://www.flickr.com/services/api/misc.dates.html
     */
    posted: string;
    /**
     * Date time when the photo was taken in (From Official) MySQL `datetime` format.
     * @example "2023-04-30 17:59:44"
     * @see https://www.flickr.com/services/api/misc.dates.html
     */
    taken: string;
    /**
     * (From Official) The accuracy to which we know the date to be true. At present, the following granularities are used:
     * - 0: Y-m-d H:i:s
     * - 4: Y-m
     * - 6: Y
     * - 8: Circa...
     */
    takengranularity: number;
    takenunknown: string;
    /**
     * Unix timestamp of when the photo was last updated.
     * @example 1683055302
     * @see https://www.flickr.com/services/api/misc.dates.html
     */
    lastupdate: string;
  };
  /**
   * (From official) The `<permissions>` element is only returned for photos
   * owned by the calling user.
   */
  permissions?: {
    permcomment: number;
    permaddmeta: number;
  };
  /**
   * The number of views of the photo.
   * @example 550
   */
  views: number;
  editability: {
    cancomment: NumericBoolean;
    canaddmeta: NumericBoolean;
  };
  publiceditability: {
    cancomment: NumericBoolean;
    canaddmeta: NumericBoolean;
  };
  usage: {
    candownload: NumericBoolean;
    canblog: NumericBoolean;
    canprint: NumericBoolean;
    canshare: NumericBoolean;
  };
  /**
   * The number of comments on the photo.
   * @example "0"
   */
  comments: string;
  notes: {
    note: [];
  };
  people: {
    /**
     * Whether the photo has tagged people or not.
     */
    haspeople: NumericBoolean;
  };
  tags: {
    /**
     * The tags of the photo.
     * @example ["cosplay", "pf", "pf38"]
     */
    tag: string[];
  };
  urls: {
    /**
     * The url to the photo.
     * @example ["https://www.flickr.com/photos/moontai0724/52865522979/"]
     */
    url: string[];
  };
  media: "photo" | "video";
  /**
   * The video meta of this item, only present if the media is a video.
   */
  video?: {
    /** Can't be sure if this is a boolean or total amount of processing. */
    ready: number;
    /** Can't be sure if this is a boolean or total amount of processing. */
    failed: number;
    /** Can't be sure if this is a boolean or total amount of processing. */
    pending: number;
    /**
     * Total seconds of the video.
     * @example "131"
     */
    duration: string;
    /** This is smaller than the real size, can't sure what size is this. */
    width: string;
    /** This is smaller than the real size, can't sure what size is this. */
    height: string;
  };
}
