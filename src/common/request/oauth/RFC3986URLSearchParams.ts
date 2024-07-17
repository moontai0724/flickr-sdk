export class RFC3986URLSearchParams extends URLSearchParams {
  toString(): string {
    this.sort();
    this.forEach((value, key) => {
      if (value === undefined) this.delete(key);
      if (value === null) this.set(key, "");
    });

    return super
      .toString()
      .replace(
        /[!'()*]/g,
        (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
      );
  }
}
