import { handleRestResponse } from "./handle-rest-response";
import { prepareParams } from "./prepare-params";

const endpoint = "https://api.flickr.com/services/rest";

export async function requestRest<T>(
  credentials: Credentials | undefined,
  params: Record<PropertyKey, string | undefined> | URLSearchParams,
  key?: string,
) {
  const url = new URL(endpoint);
  const urlSearchParams = await prepareParams({
    credentials,
    endpoint,
    params,
  });

  url.search = urlSearchParams.toString();

  const request = new Request(url);

  return fetch(request).then((response) =>
    handleRestResponse<T>(response, key),
  );
}
