import { createRootRoute, createRoute, Outlet, Router } from "@tanstack/react-router";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SendRecoverPage from "./pages/auth/SendRecover";
import VerifyPage from "./pages/auth/VerifyPage";
import ChangePasswordPage from "./pages/auth/ChangePassword";

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

const sendRecoverRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/sendRecover",
  component: SendRecoverPage
})

const verifyRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/verify",
  component: VerifyPage
});

const changePasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/change-password",
  component: ChangePasswordPage
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute, registerRoute, sendRecoverRoute, verifyRoute, changePasswordRoute])
]);

export const router = new Router({
  routeTree
});

declare module "@tanstack/react-router" {
  interface Register {
    routes: typeof routeTree;
  }
}