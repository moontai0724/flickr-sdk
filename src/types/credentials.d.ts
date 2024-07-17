interface WithApiKey {
  apiKey: string;
}

interface WithOAuthCredentials {
  /**
   * API key, a.k.a. consumer key, means your app key.
   */
  apiKey: string;
  /**
   * Consumer secret, means your app secret.
   */
  consumerSecret: string;
  /**
   * OAuth token, this could be retrieve when requesting any token.
   */
  oauthToken: string;
  /**
   * OAuth token secret, this could be retrieve when requesting the request token.
   */
  oauthTokenSecret: string;
}

type Credentials = WithApiKey | WithOAuthCredentials;
interface WithCredentials {
  credentials?: Credentials;
}
