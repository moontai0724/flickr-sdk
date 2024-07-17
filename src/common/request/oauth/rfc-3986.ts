export function encodeRFC3986(value: string) {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

/**
 * @see https://oauth.net/core/1.0a/#rfc.section.9.1.3
 * @see https://oauth.net/core/1.0a/#encoding_parameters
 */
export function serializeRFC3986(params: string[]) {
  return params.map(encodeRFC3986).join("&");
}
