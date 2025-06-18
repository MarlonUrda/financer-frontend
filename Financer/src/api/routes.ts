const server = import.meta.env.VITE_API_URL || "localhost";
export const apiRoutes = {
  //Auth Routes
  login: () => `${server}/auth/login`,
  register: () => `${server}/auth/register`,
  sendEmail: () => `${server}/auth/send`,
  recover: () => `${server}/auth/recover`,
  verify: () => `${server}/auth/verify`,
}

export type ApiRoutes = typeof apiRoutes;
export type ApiRoute = keyof ApiRoutes;

export type ApiRouteParams<T extends ApiRoute> = Parameters<ApiRoutes[T]>;