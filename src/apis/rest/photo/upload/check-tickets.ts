import { requestRest } from "common/request";
import type { WithCredentials } from "types";

export enum CheckTicketsStatus {
  NotCompleted = 0,
  Completed = 1,
  Failed = 2,
}

export interface CheckTicketsOptions extends WithCredentials {
  /**
   * A list of ticket ids.
   */
  tickets: string[];
}

export interface CheckTicketsResponse {
  /**
   * The id attribute contains the corresponding ticket id.
   */
  id: string;
  /**
   * - 0: not completed
   * - 1: completed
   * - 2: the ticket failed (indicating there was a problem converting the
   *   file).
   */
  complete: CheckTicketsStatus;
  /**
   * Present if the ticket wasn't found.
   */
  invalid?: 1;
  /**
   * Only present if the upload was completed.
   */
  photoid?: string;
  /**
   * Might be the timestamp of the photo's creation. Null if the photo is
   * completed but gone.
   */
  imported?: string | null;
}

/**
 * Checks the status of one or more asynchronous photo upload tickets.
 *
 * @see https://www.flickr.com/services/api/flickr.photos.upload.checkTickets.html
 */
export async function checkTickets(options: CheckTicketsOptions) {
  const { credentials } = options;

  return requestRest<CheckTicketsResponse>({
    credentials,
    params: {
      method: "flickr.photos.upload.checkTickets",
      tickets: options.tickets.join(","),
    },
    key: "uploader",
  });
}
