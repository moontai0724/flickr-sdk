export interface PhotoSize {
  /**
   * Description of the size.
   * @example "Square"
   * @example "X-Large 6K"
   * @example "Original"
   */
  label: string;
  width: number;
  height: number;
  /**
   * The direct image url for the size.
   * @example "https://live.staticflickr.com/65535/52865522979_a22165bf3f_o.jpg"
   */
  source: string;
  /**
   * The url to the image description page.
   * @example "https://www.flickr.com/photos/moontai0724/52865522979/sizes/o/"
   */
  url: string;
  /**
   * @example "photo"
   */
  media: string;
}
