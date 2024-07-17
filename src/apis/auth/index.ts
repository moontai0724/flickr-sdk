export * from "./access-token";
export * from "./request";

export function constructAuthUrl(
  oauthToken: string,
  permission: "read" | "write" | "delete",
) {
  const url = new URL("https://www.flickr.com/services/oauth/authorize");

  url.searchParams.set("oauth_token", oauthToken);
  url.searchParams.set("perms", permission);

  return url.toString();
}
