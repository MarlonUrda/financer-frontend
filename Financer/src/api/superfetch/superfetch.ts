import { type ApiRoute, type ApiRouteParams } from "../routes";
import {
  createRouteWithParams,
  generateFormData,
  getHeaders,
  handleResponse,
} from "./helpers";
import type { SuperFetchParams } from "./types";

export class SuperFetchError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = "SuperFetchError";
  }
}

export async function superFetch<
  Request,
  Response,
  Route extends ApiRoute = ApiRoute,
  QueryParams extends Record<string, any> | undefined = undefined,
>({
  options,
  route,
  routeParams,
  queryParams,
  responseSchema,
  payload,
}: SuperFetchParams<Request, Response, Route, QueryParams>): Promise<Response> {
  if (routeParams === undefined) {
    routeParams = [] as ApiRouteParams<Route>;
  }

  const headers = await getHeaders(
    options.includeCredentials ?? false,
    false,
    options.method
  );

  let realRoute = createRouteWithParams<Route, QueryParams>(
    route,
    routeParams,
    queryParams
  );

  console.log("fetching", realRoute);

  const response = await fetch(realRoute, {
    method: options.method,
    headers: headers,
    body: payload ? JSON.stringify(payload) : undefined,
    credentials: options.includeCredentials ? "include" : "omit",
  });

  return handleResponse(response, responseSchema);
}
