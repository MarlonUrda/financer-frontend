import { type ApiRoute, type ApiRouteParams } from "../routes";
import { z } from "zod";

export class SuperFetchError extends Error {
  code: number;

  constructor(msg: string, code: number) {
    super(msg);
    this.code = code;
    this.name = "SuperFetchError";
  }
}

export interface SuperFetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  includeCredentials?: boolean;
}

export interface SuperFetchParams<
  Request,
  Response,
  Route extends ApiRoute = ApiRoute,
  QueryParams extends undefined | Record<string, any> = undefined,
> {
  options: SuperFetchOptions;
  route: Route;
  routeParams?: ApiRouteParams<Route>;
  queryParams?: QueryParams;
  responseSchema: z.ZodType<Response>;
  payload?: Request;
}

// export interface SuperFetchMultiPartParams<
//   Request extends Record<string, string | ImagePickerAsset | ImagePickerAsset[] | number | boolean>,
//   Response,
//   Route extends ApiRoute = ApiRoute,
//   QueryParams extends undefined | Record<string, any> = undefined
// > {
//   options: Omit<SuperFetchOptions, "method">;
//   route: Route;
//   routeParams?: ApiRouteParams<Route>;
//   queryParams?: QueryParams;
//   responseSchema: z.ZodType<Response>;
//   payload: Request;
// }

// export interface FileUpload {
//   uri: string,
//   title: string,
//   type?: string
// }
