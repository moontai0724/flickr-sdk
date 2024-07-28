import { requestRest } from "common/request";
import type {
  NumericBoolean,
  Paginated,
  Photo,
  PhotoExtras,
  PhotoExtrasOption,
  SortingOption,
  Visibility,
  WithCredentials,
} from "types";

export enum GetPhotosPrivacyFilter {
  Public = 1,
  Friends = 2,
  Family = 3,
  FriendsAndFamily = 4,
  Private = 5,
}

export interface GetPhotosOptions extends WithCredentials {
  /**
   * The id of the photoset to return the photos for.
   */
  photosetId: string;
  /**
   * The user_id here is the owner of the set passed in photoset_id.
   */
  userId: string;
  /**
   * A list of extra information to fetch for each returned record.
   */
  extras?: PhotoExtrasOption[];
  /**
   * The number of photos to return per page. If this argument is omitted, it
   * defaults to 500. The maximum allowed value is 500.
   */
  perPage?: number;
  /**
   * The page of results to return. If this argument is omitted, it defaults to
   * 1.
   */
  page?: number;
  /**
   * Return photos only matching a certain privacy level. This only applies when
   * making an authenticated call to view a photoset you own. Valid values are:
   *
   * - 1 public photos
   * - 2 private photos visible to friends
   * - 3 private photos visible to family
   * - 4 private photos visible to friends & family
   * - 5 completely private photos
   */
  privacyFilter?: GetPhotosPrivacyFilter;
  /**
   * Filter results by media type. Possible values are `all` (default), `photos`
   * or `videos`
   */
  media?: "all" | "photos" | "videos";
}

export interface GetPhotosItem
  extends Pick<Photo, "id" | "secret" | "server" | "farm" | "title">,
    Visibility,
    PhotoExtras {
  isprimary: NumericBoolean;
}

export interface GetPhotosResponse extends Paginated {
  id: string;
  primary: string;
  /**
   * The user NSID of the owner of the set.
   */
  owner: string;
  /**
   * The display name of the user account of the owner of the set.
   */
  ownername: string;
  photo: GetPhotosItem[];
  /**
   * Title of the set.
   */
  title: string;
  sortingOptionId: SortingOption;
}

/**
 * Get the list of photos in a set.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
 */
export async function getPhotos({
  credentials,
  photosetId,
  userId,
  extras,
  perPage,
  page,
  privacyFilter,
  media,
}: GetPhotosOptions) {
  return requestRest<GetPhotosResponse>({
    credentials,
    params: {
      method: "flickr.photosets.getPhotos",
      photoset_id: photosetId,
      user_id: userId,
      extras: extras?.join(","),
      per_page: perPage?.toString(),
      page: page?.toString(),
      privacy_filter: privacyFilter?.toString(),
      media,
    },
    key: "photoset",
  });
}
