import { createHMAC, createSHA1 } from "hash-wasm";

/**
 * Digest to base64 with HMAC-SHA1 in wasm hash.
 * @see https://oauth.net/core/1.0a/#rfc.section.9.2
 * @returns base64 encoded string
 */
export async function hmacSHA1(value: string, key: string) {
  const hasher = await createHMAC(createSHA1(), key);
  const binary = hasher.update(value).digest("binary");
  const base64 = Buffer.from(binary).toString("base64");

  return base64;
}
