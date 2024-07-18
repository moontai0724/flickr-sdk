import { handleRestResponse } from "./handle-rest-response";
import { prepareParams } from "./prepare-params";

const endpoint = "https://api.flickr.com/services/rest";

export interface RequestRestOptions {
  credentials?: Credentials;
  key?: string;
  method?: "GET" | "POST";
  params: Record<PropertyKey, string | undefined> | URLSearchParams;
}

export async function requestRest<T>(options: RequestRestOptions) {
  const { method = "GET", credentials, params, key } = options;
  const url = new URL(endpoint);
  const urlSearchParams = await prepareParams({
    credentials,
    method,
    endpoint,
    params,
  });

  url.search = urlSearchParams.toString();

  const request = new Request(url, { method });

  return fetch(request).then((response) =>
    handleRestResponse<T>(response, key),
  );
}
