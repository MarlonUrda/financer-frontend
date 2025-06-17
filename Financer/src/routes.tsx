import { createRootRoute, createRoute, Outlet, Router } from "@tanstack/react-router";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/register",
  component: RegisterPage,
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute, registerRoute])
]);

export const router = new Router({
  routeTree
});

declare module "@tanstack/react-router" {
  interface Register {
    routes: typeof routeTree;
  }
}