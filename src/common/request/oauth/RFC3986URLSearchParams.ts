import { encodeRFC3986 } from "./rfc-3986";

export class RFC3986URLSearchParams extends URLSearchParams {
  cleanup(): RFC3986URLSearchParams {
    this.forEach((value, key) => {
      if (value === undefined) this.delete(key);
      if (value === null) this.set(key, "");
    });

    return this;
  }

  toString(): string {
    this.sort();

    return Object.entries(Object.fromEntries(this))
      .map(([key, value]) => `${encodeRFC3986(key)}=${encodeRFC3986(value)}`)
      .join("&");
  }
}
