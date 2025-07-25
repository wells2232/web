import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Skeleton } from '@/components/ui/skeleton';
import { useInitializeAuth } from '../hooks/use-initialize-auth';

export const Route = createRootRoute({
  component: RootComponent,
});

export function RootComponent() {
  const { isLoading, isError } = useInitializeAuth();

  if (isLoading) {
    return <Skeleton className="min-h-screen bg-white" />;
  }

  if (isError) {
    return <div>Error loading authentication state</div>;
  }

  return (
    <div className="min-h-screen">
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
