export type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

export function camelCase<T extends string>(value: T) {
  return value.replace(/_(\w)/g, (_, p1) => p1.toUpperCase()) as CamelCase<T>;
}

export type CamelCaseObject<T extends object> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends Record<string, unknown>
    ? CamelCaseObject<T[K]>
    : T[K];
};

export function camelCaseObject<T extends object>(
  target: T,
): CamelCaseObject<T>;
export function camelCaseObject(target: object): unknown {
  if (typeof target !== "object") {
    return target;
  }

  if (Array.isArray(target)) {
    return target.map(camelCaseObject);
  }

  return Object.entries(target).reduce(
    (acc, [key, value]) => {
      const camelCasedKey = typeof key === "string" ? camelCase(key) : key;

      acc[camelCasedKey] = camelCaseObject(value);

      return acc;
    },
    {} as Record<PropertyKey, unknown>,
  );
}
