import { requestRest } from "common/request";
import type { WithOAuthCredentials } from "types";

export interface OrderSetsOptions extends WithOAuthCredentials {
  /**
   * A list of photoset IDs, ordered with the set to show first, first in the
   * list. Any set IDs not given in the list will be set to appear at the end of
   * the list, ordered by their IDs.
   */
  photosetIds: string[];
}

export type OrderSetsResponse = void;

/**
 * Set the order of photosets for the calling user.
 *
 * This method requires authentication with 'write' permission.
 *
 * @see https://www.flickr.com/services/api/flickr.photosets.orderSets.html
 */
export async function orderSets({
  credentials,
  photosetIds,
}: OrderSetsOptions) {
  return requestRest<OrderSetsResponse>({
    credentials,
    method: "POST",
    params: {
      method: "flickr.photosets.orderSets",
      photoset_ids: photosetIds.join(","),
    },
  });
}
