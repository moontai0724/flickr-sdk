import { requestRest } from "common/request";
import type { PhotoSize } from "types/items";

export interface GetSizesOptions extends WithCredentials {
  /**
   * The id of the photo to fetch size information for.
   */
  photoId: string;
}

export interface GetSizesResponse {
  canblog: NumericBoolean;
  canprint: NumericBoolean;
  candownload: NumericBoolean;
  size: PhotoSize[];
}

/**
 * Returns the available sizes for a photo. The calling user must have
 * permission to view the photo.
 *
 * @see https://www.flickr.com/services/api/flickr.photos.getSizes.html
 */
export async function getSizes(options: GetSizesOptions) {
  const { credentials, photoId } = options;

  return requestRest<GetSizesResponse>({
    credentials,
    params: {
      method: "flickr.photos.getSizes",
      photo_id: photoId,
    },
    key: "sizes",
  });
}
