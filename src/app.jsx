import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages/auth-page';
import { HomePage } from './pages/home-page';

const queryClienty = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClienty}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<AuthPage />} path={'/auth'} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
