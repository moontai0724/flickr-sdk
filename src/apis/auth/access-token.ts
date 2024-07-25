import { OAuthURLSearchParams } from "common/request";
import { camelCaseObject } from "common/transformer";

export interface AccessTokenResponse {
  /**
   * The user's real name in system.
   */
  fullname: string;
  /**
   * OAuth Token.
   */
  oauthToken: string;
  /**
   * OAuth Token Secret.
   */
  oauthTokenSecret: string;
  /**
   * The user's NSID.
   * @example "140551311@N06"
   */
  userNsid: string;
  /**
   * The user's username.
   * @example "月太げつたい"
   */
  username: string;
}

/**
 * Exchanging the Request Token for an Access Token.
 *
 * After the user authorizes your application, you can exchange the approved
 * [Request
 * Token](https://www.flickr.com/services/api/auth.oauth.html#request_token) for
 * an Access Token. This Access Token should be stored by your application, and
 * used to make authorized requests to Flickr.
 *
 * @param consumerToken Consumer key, means your app key.
 * @param consumerSecret Consumer secret, means your app secret.
 * @see https://www.flickr.com/services/api/auth.oauth.html
 * @throws a query string formatted error message when failed to request a url.
 */
export async function accessToken(
  consumerToken: string,
  consumerSecret: string,
  oauthToken: string,
  oauthTokenSecret: string,
  oauthVerifier: string,
) {
  const endpoint = "https://www.flickr.com/services/oauth/access_token";
  const url = new URL(endpoint);
  const params = new OAuthURLSearchParams({
    oauth_verifier: oauthVerifier,
  });

  await params.sign(
    "GET",
    endpoint,
    {
      token: consumerToken,
      secret: consumerSecret,
    },
    {
      token: oauthToken,
      secret: oauthTokenSecret,
    },
  );

  url.search = params.toString();

  const response = await fetch(url).then((res) => res.text());

  if (response.includes("oauth_problem")) {
    return Promise.reject(response);
  }

  const content = Object.fromEntries(new URLSearchParams(response).entries());
  const camelCased = camelCaseObject(content) as unknown as AccessTokenResponse;

  return camelCased;
}
