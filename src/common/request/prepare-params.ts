import { OAuthURLSearchParams } from "./oauth";

export interface PrepareParamsOptions {
  credentials?: Credentials;
  endpoint: string;
  method?: "GET" | "POST";
  params: Record<PropertyKey, unknown> | URLSearchParams;
  setJsonFormat?: boolean;
}

export async function prepareParams(options: PrepareParamsOptions) {
  const {
    credentials,
    method = "GET",
    endpoint,
    params,
    setJsonFormat = true,
  } = options;

  const urlSearchParams = new OAuthURLSearchParams(params);

  if (setJsonFormat) {
    urlSearchParams.set("format", "json");
    urlSearchParams.set("nojsoncallback", "1");
  }

  // No credentials, return the params without keys
  if (!credentials?.apiKey) return urlSearchParams;

  // With API key only, no OAuth tokens
  if ("consumerSecret" in credentials === false) {
    urlSearchParams.set("api_key", credentials.apiKey);

    return urlSearchParams;
  }

  // OAuth
  return urlSearchParams.sign(
    method,
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
