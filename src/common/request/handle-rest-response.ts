import { asContentDeep, camelCaseObject } from "../transformer";

export async function handleRestResponse<T, R extends Response = Response>(
  response: R,
  key?: string,
): Promise<T>;
export async function handleRestResponse(response: Response, key?: string) {
  const text = await response.text();
  const context = await (async () => JSON.parse(text))().catch(() =>
    Promise.reject(text),
  );

  if ("code" in context) {
    // Error Code
    return Promise.reject(context);
  }

  const value = key ? context[key] : context;

  return camelCaseObject(asContentDeep(value));
}
