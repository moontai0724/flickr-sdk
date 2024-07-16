export function prepareSearchParams(param: Record<PropertyKey, unknown>) {
  const urlSearchParams = new URLSearchParams();

  urlSearchParams.set("format", "json");
  urlSearchParams.set("nojsoncallback", "1");

  return Object.entries(param).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      urlSearchParams.set(key, value as never);
    }

    return acc;
  }, urlSearchParams);
}
