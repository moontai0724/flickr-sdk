import { asContentDeep, camelCaseObject } from "../transformer";

export async function handleRestResponse<T, R extends Response = Response>(
  response: R,
  key?: string,
): Promise<T>;
export async function handleRestResponse(response: Response, key?: string) {
  const context = await response.json();

  if ("code" in context) {
    // Error Code
    return Promise.reject(context);
  }

  const value = key ? context[key] : context;

  return camelCaseObject(asContentDeep(value));
}
