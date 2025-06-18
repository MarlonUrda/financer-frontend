import { type ApiRoute, type ApiRouteParams, apiRoutes } from "../routes";
import { z } from "zod";
import { SuperFetchError } from "./types";

export async function handleResponse(
  response: globalThis.Response,
  responseSchema: z.ZodType<any>
) {
  console.log(response.body);

  if (response.ok) {
    const data = await response.json();
    try {
      return responseSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.errors);
      }

      throw new SuperFetchError(
        "El servidor envio una respuesta inesperada",
        response.status
      );
    }
  } else {
    const data = await response.json();
    console.log(data);
    throw new SuperFetchError(
      data.error ?? "Ocurrio un error",
      response.status
    );
  }
}

export function createRouteWithParams<
  Route extends ApiRoute = ApiRoute,
  QueryParams extends Record<string, any> | undefined = undefined,
>(
  route: Route,
  routeParams: ApiRouteParams<Route>,
  queryParams: QueryParams | undefined
): string {
  // @ts-ignore
  let realRoute = apiRoutes[route](...routeParams);

  if (queryParams) {
    const query = new URLSearchParams();

    for (const key in queryParams) {
      if (queryParams[key] === undefined || !queryParams[key]?.toString) {
        continue;
      }
      query.append(key, queryParams[key].toString());
    }

    realRoute += `?${query.toString()}`;
  }
  return realRoute;
}

export async function getHeaders(
  includeCredentials: boolean,
  multipart: boolean,
  //@ts-ignore
  method: "GET" | "POST" | "PUT" | "DELETE",
  token?: string
) {
  const headers = new Headers();
  if (multipart) {
    headers.set("Content-Type", "multipart/form-data");
  } else {
    headers.set("Content-Type", "application/json");
  }

  if (includeCredentials && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

export const generateFormData = <T extends Record<string, any>>(
  data: T
): FormData => {
  const formData = new FormData();

  // Definimos el tipo para detectar assets con uri
  interface FileLike {
    uri: string;
    fileName?: string;
    mimeType?: string;
  }

  for (const key in data) {
    if (key === "asset") continue;
    const value = data[key];

    // Si el valor es un arreglo y el primer elemento tiene propiedad uri,
    // lo interpretamos como un arreglo de archivos y los agregamos siempre con la key "media[]"
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      (value[0] as FileLike)?.uri
    ) {
      (value as FileLike[]).forEach((item) => {
        if (item.uri) {
          formData.append("media[]", {
            uri: item.uri,
            name: item.fileName || "image.jpg",
            type: item.mimeType || "image/jpeg",
          } as any);
        }
      });
    }
    // Si el valor es un asset (tiene uri) pero no está en un arreglo,
    // lo agregamos con la key "media[]"
    else if (value?.uri) {
      const item = value as FileLike;
      formData.append("media[]", {
        uri: item.uri,
        name: item.fileName || "image.jpg",
        type: item.mimeType || "image/jpeg",
      } as any);
    }
    // Para el resto de propiedades, se agregan normalmente bajo su key
    else {
      formData.append(key, value);
    }
  }

  console.log(formData);

  return formData;
};
