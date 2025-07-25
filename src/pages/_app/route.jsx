import { createFileRoute, Outlet } from '@tanstack/react-router';
import { NavBar } from '@/layout/navbar';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

export function AppLayout() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Outlet />
    </div>
  );
}
