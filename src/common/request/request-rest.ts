import { handleRestResponse } from "./handle-rest-response";
import { prepareSearchParams } from "./prepare-search-params";

export async function requestRest<T>(
  param: Record<PropertyKey, unknown>,
  key?: string,
) {
  const urlSearchParams = prepareSearchParams(param);
  const url = new URL("https://api.flickr.com/services/rest");

  url.search = urlSearchParams.toString();

  const request = new Request(url);

  return fetch(request).then((response) =>
    handleRestResponse<T>(response, key),
  );
}
