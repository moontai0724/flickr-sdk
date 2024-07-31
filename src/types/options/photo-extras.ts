export type PhotoExtrasOptionEnum =
  | "license"
  | "date_upload"
  | "date_taken"
  | "owner_name"
  | "icon_server"
  | "original_format"
  | "last_update"
  | "geo"
  | "tags"
  | "machine_tags"
  | "o_dims"
  | "views"
  | "media"
  | "path_alias"
  | "url_sq"
  | "url_t"
  | "url_s"
  | "url_m"
  | "url_o";

export type PhotoExtrasOption =
  | PhotoExtrasOptionEnum
  | (string & NonNullable<unknown>); // preserve possibility to any string
