import { handleRestResponse } from "./handle-rest-response";
import { OAuthURLSearchParams } from "./oauth";

const endpoint = "https://api.flickr.com/services/rest";

async function prepareParams(
  credentials: Credentials | undefined,
  params: Record<PropertyKey, string> | URLSearchParams,
) {
  const urlSearchParams = new OAuthURLSearchParams(params);

  urlSearchParams.set("format", "json");
  urlSearchParams.set("nojsoncallback", "1");

  // No credentials, return the params without keys
  if (!credentials?.apiKey) return urlSearchParams;

  // With API key only, no OAuth tokens
  if ("consumerSecret" in credentials === false) {
    urlSearchParams.set("api_key", credentials.apiKey);

    return urlSearchParams;
  }

  // OAuth
  return urlSearchParams.sign(
    "GET",
    endpoint,
    {
      token: credentials.apiKey,
      secret: credentials.consumerSecret,
    },
    {
      token: credentials.oauthToken!,
      secret: credentials.oauthTokenSecret!,
    },
  );
}

export async function requestRest<T>(
  credentials: Credentials | undefined,
  params: Record<PropertyKey, string | undefined> | URLSearchParams,
  key?: string,
) {
  const url = new URL(endpoint);
  const urlSearchParams = await prepareParams(credentials, params as never);

  url.search = urlSearchParams.toString();

  const request = new Request(url);

  return fetch(request).then((response) =>
    handleRestResponse<T>(response, key),
  );
}
