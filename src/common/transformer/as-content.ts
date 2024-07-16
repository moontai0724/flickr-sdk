export type AsContent<T> = T extends { _content: infer U } ? U : T;

export function asContent<T>(target: T): AsContent<T> {
  if (target && typeof target === "object" && "_content" in target) {
    // eslint-disable-next-line no-underscore-dangle
    return target._content as never;
  }

  return target as never;
}

export type AsContentDeep<T> = T extends { _content: infer U }
  ? AsContent<U>
  : T extends Record<PropertyKey, unknown>
    ? { [K in keyof T]: AsContentDeep<T[K]> }
    : T;

export function asContentDeep<T>(target: T): AsContentDeep<T>;
export function asContentDeep(target: unknown): unknown {
  const content = asContent(target);

  if (typeof content !== "object" || !content) {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map(asContentDeep);
  }

  if ("_content" in content) {
    // eslint-disable-next-line no-underscore-dangle
    return asContentDeep(content._content);
  }

  return Object.entries(content).reduce(
    (acc, [key, value]) => {
      acc[key] = asContentDeep(value);

      return acc;
    },
    {} as Record<PropertyKey, unknown>,
  );
}
