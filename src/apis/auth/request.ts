import { OAuthURLSearchParams } from "common/request";
import { camelCaseObject } from "common/transformer";

export interface RequestResponse {
  oauthCallbackConfirmed: "true" | string;
  oauthToken: string;
  oauthTokenSecret: string;
}

/**
 * Getting a Request Token.
 *
 * The first step to obtaining authorization for a user is to get a Request
 * Token using your Consumer Key. This is a temporary token that will be used to
 * authenticate the user to your application. This token, along with a token
 * secret, will later be exchanged for an [Access
 * Token](https://www.flickr.com/services/api/auth.oauth.html#access_token).
 *
 * @param token Consumer key, means your app key.
 * @param secret Consumer secret, means your app secret.
 * @see https://www.flickr.com/services/api/auth.oauth.html
 * @throws a query string formatted error message when failed to request a url.
 */
export async function requestToken(
  token: string,
  secret: string,
  callbackUrl: string = "",
) {
  const endpoint = "https://www.flickr.com/services/oauth/request_token";
  const url = new URL(endpoint);
  const params = new OAuthURLSearchParams({
    oauth_callback: callbackUrl,
  });

  await params.sign("GET", endpoint, { token, secret });
  url.search = params.toString();

  const response = await fetch(url).then((res) => res.text());

  if (!response.includes("oauth_token")) {
    return Promise.reject(response);
  }

  const content = Object.fromEntries(new URLSearchParams(response).entries());
  const camelCased = camelCaseObject(content) as unknown as RequestResponse;

  return camelCased;
}
