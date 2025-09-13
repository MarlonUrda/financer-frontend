import {
  createRootRoute,
  createRoute,
  Outlet,
  Router,
} from "@tanstack/react-router";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SendRecoverPage from "./pages/auth/SendRecover";
import VerifyPage from "./pages/auth/VerifyPage";
import ChangePasswordPage from "./pages/auth/ChangePassword";
import AdminLayout from "./pages/admin/AdminLayout";
import { PayTypesScreen } from "./pages/admin/PayTypesAdmin";
import { TestPanel } from "./test";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthLayout,
});

const testRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <TestPanel />,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
});

//Auth routes: /auth/<route>
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
  component: SendRecoverPage,
});

const verifyRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/verify/:email",
  component: VerifyPage,
});

const changePasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/change-password",
  component: ChangePasswordPage,
});

const adminPayTypesRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/payment-types",
  component: PayTypesScreen,
});

const routeTree = rootRoute.addChildren([
  testRoute,
  authRoute.addChildren([
    loginRoute,
    registerRoute,
    sendRecoverRoute,
    verifyRoute,
    changePasswordRoute,
  ]),
  adminRoute.addChildren([adminPayTypesRoute]),
]);

export const router = new Router({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    routes: typeof routeTree;
  }
}
