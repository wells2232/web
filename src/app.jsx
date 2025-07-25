import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useInitializeAuth } from './hooks/use-initialize-auth';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

export function App() {
  const { isLoading } = useInitializeAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-blue-500 border-b-2" />
        <p className="ml-4 text-gray-700">Carregando...</p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
