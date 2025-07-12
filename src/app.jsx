import { Route, Routes } from 'react-router-dom';
import { useInitializeAuth } from './hooks/use-initialize-auth';
import { MainLayout } from './layout/main-layout';
import { AuthPage } from './pages/auth-page';
import { HomePage } from './pages/home-page';

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
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<HomePage />} path="/" />
        <Route
          element={<h2>Página de Detalhes do Item</h2>}
          path="/items/:id"
        />
      </Route>
      <Route element={<AuthPage />} path={'/auth'} />
    </Routes>
  );
}
