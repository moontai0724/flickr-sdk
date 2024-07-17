import { hmacSHA1 } from "./hmac-sha1";
import { serializeRFC3986 } from "./rfc-3986";
import { RFC3986URLSearchParams } from "./RFC3986URLSearchParams";

interface OAuthCredentialSet {
  secret: string;
  token: string;
}

/**
 * Returns the Unix timestamp.
 * @see https://oauth.net/core/1.0a/#nonce
 */
function timestamp(): string {
  return Math.floor(Date.now() / 1000).toString();
}

/**
 * Generates a random string. OAuth 1.0 defines a nonce as a value unique
 * within a given timestamp in seconds.
 * @see https://oauth.net/core/1.0a/#nonce
 */
function nonce(): string {
  return Date.now().toString();
}

/**
 * The signature method is always HMAC-SHA1.
 * @see https://oauth.net/core/1.0a/#rfc.section.9.2
 */
const signatureMethod = "HMAC-SHA1";

/**
 * The version is always 1.0.
 */
const version = "1.0";

/**
 * A modified URLSearchParams class that supports to sign as OAuth 1.0.
 * @see https://www.flickr.com/services/api/auth.oauth.html
 */
export class OAuthURLSearchParams extends RFC3986URLSearchParams {
  protected init(consumerKey: string) {
    this.set("oauth_nonce", nonce());
    this.set("oauth_timestamp", timestamp());
    this.set("oauth_consumer_key", consumerKey);
    this.set("oauth_signature_method", signatureMethod);
    this.set("oauth_version", version);
    this.delete("oauth_signature");
  }

  /**
   * Calculates the OAuth 1.0 signing key.
   */
  // eslint-disable-next-line class-methods-use-this
  protected signingKey(consumerSecret: string, tokenSecret?: string): string {
    return serializeRFC3986([consumerSecret, tokenSecret || ""]);
  }

  /**
   * OAuth 1.0 base string.
   */
  protected baseString(method: string, url: string): string {
    return serializeRFC3986([method, url, this.toString()]);
  }

  /**
   * Calculates the OAuth 1.0 signature.
   */
  protected async signature(
    method: string,
    url: string,
    consumerSecret: string,
    tokenSecret?: string,
  ): Promise<string> {
    return hmacSHA1(
      this.baseString(method, url),
      this.signingKey(consumerSecret, tokenSecret),
    );
  }

  /**
   * Signs the current instance with the OAuth 1.0 signature.
   *
   * @param method HTTP method
   * @param url The URL to be requested.
   * @param consumerCredentials Consumer key and secret, means your app key and secret.
   * @param userCredential User key and secret, means the key and secret of the user who authorizes your app.
   * @returns Same object as the current instance with the signature added.
   */
  async sign(
    method: "GET" | "POST",
    url: string,
    consumerCredentials: OAuthCredentialSet,
    userCredential?: OAuthCredentialSet,
  ) {
    this.init(consumerCredentials.token);

    if (userCredential) {
      this.set("oauth_token", userCredential.token);
    }

    const signature = await this.signature(
      method,
      url,
      consumerCredentials.secret,
      userCredential?.secret,
    );

    this.set("oauth_signature", signature);

    return this;
  }
}
