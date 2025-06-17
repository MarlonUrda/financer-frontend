import { Outlet } from "@tanstack/react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
      <div className="relative w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
