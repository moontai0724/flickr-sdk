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

    return super
      .toString()
      .replace(
        /[!'()*]/g,
        (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
      );
  }
}
