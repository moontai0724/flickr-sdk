export const apiKey = process.env.FLICKR_API_KEY!;
export const consumerSecret = process.env.FLICKR_CONSUMER_SECRET!;
export const oauthCredential = {
  apiKey,
  consumerSecret,
  oauthToken: process.env.FLICKR_OAUTH_TOKEN!,
  oauthTokenSecret: process.env.FLICKR_OAUTH_TOKEN_SECRET!,
};

export const user = {
  nsid: process.env.FLICKR_USER_NSID!,
};
