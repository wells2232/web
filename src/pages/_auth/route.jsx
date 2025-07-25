import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
});

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Outlet />
    </div>
  );
}
