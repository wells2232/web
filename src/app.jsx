import { Route, Routes } from 'react-router-dom';
import { useInitializeAuth } from './hooks/use-initialize-auth';
import { MainLayout } from './layout/main-layout';
import { AuthPage } from './pages/auth/auth-page';
import { RequestResetPasswordPage } from './pages/auth/request-reset-password';
import { ResetPasswordPage } from './pages/auth/reset-password-page';
import { HomePage } from './pages/home-page';
import { ItemGrid } from './pages/items/ItemsGrid'; 

export function App() {
  const { isLoading } = useInitializeAuth();

  const items = [
  {
    id: 1,
    item_name: "Bicicleta Caloi",
    description: "Bicicleta aro 26 com marchas",
    exchange_preferences: "Troco por patins",
    created_at: "2025-07-20T14:32:00Z",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvllvhmZhjAskvMend3EBqw2ffI2KGfUaOGw&s",
    image_public_id: "bicicleta_caloi_01",
    user_name: "João Silva",
    status_name: "Disponível",
    condition: "Usado",
  },
  {
    id: 2,
    item_name: "Notebook Lenovo",
    description: "Notebook i5, 8GB RAM",
    exchange_preferences: "Aceito troca por tablet",
    created_at: "2025-07-18T09:10:00Z",
    image_url: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=300",
    image_public_id: "notebook_lenovo_02",
    user_name: "Maria Oliveira",
    status_name: "Disponível",
    condition: "Seminovo",
  },
  {
    id: 3,
    item_name: "Liquidificador Oster",
    description: "Modelo potente, 3 velocidades",
    exchange_preferences: "Troco por ferro de passar",
    created_at: "2025-07-19T12:00:00Z",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsFZwuxB4xbbiz0-KdSF8pbM1IGptWPOe88Q&s",
    image_public_id: "liquidificador_oster_03",
    user_name: "Carlos Souza",
    status_name: "Disponível",
    condition: "Novo",
  },
  {
    id: 4,
    item_name: "Cadeira Gamer",
    description: "Ergonômica e confortável",
    exchange_preferences: "Troco por mesa de escritório",
    created_at: "2025-07-15T08:20:00Z",
    image_url: "https://cdn.awsli.com.br/2500x2500/2539/2539199/produto/209878758/2-cadeira-jupiter-black-e-red-oct4sm8vxl.png",
    image_public_id: "cadeira_gamer_04",
    user_name: "Ana Pereira",
    status_name: "Disponível",
    condition: "Usado",
  },
  {
    id: 5,
    item_name: "Celular Samsung A32",
    description: "64GB, com película",
    exchange_preferences: "Troco por iPhone antigo",
    created_at: "2025-07-21T13:45:00Z",
    image_url: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=300",
    image_public_id: "samsung_a32_05",
    user_name: "Lucas Almeida",
    status_name: "Disponível",
    condition: "Seminovo",
  },
  {
    id: 6,
    item_name: "Fone Bluetooth JBL",
    description: "Som estéreo de alta qualidade",
    exchange_preferences: "Troco por caixa de som",
    created_at: "2025-07-20T16:00:00Z",
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300",
    image_public_id: "fone_jbl_06",
    user_name: "Juliana Ramos",
    status_name: "Disponível",
    condition: "Novo",
  },
  {
    id: 7,
    item_name: "Camisa Esportiva Nike",
    description: "Tamanho M, Dry Fit",
    exchange_preferences: "Aceito troca por tênis",
    created_at: "2025-07-17T17:20:00Z",
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300",
    image_public_id: "camisa_nike_07",
    user_name: "Bruno Costa",
    status_name: "Disponível",
    condition: "Novo",
  },
  {
    id: 8,
    item_name: "Mochila Escolar",
    description: "Com rodinhas e compartimentos",
    exchange_preferences: "Troco por lancheira",
    created_at: "2025-07-19T10:15:00Z",
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300",
    image_public_id: "mochila_escolar_08",
    user_name: "Fernanda Lima",
    status_name: "Disponível",
    condition: "Usado",
  },
  {
    id: 9,
    item_name: "Relógio Digital Casio",
    description: "Resistente à água",
    exchange_preferences: "Aceito fone de ouvido",
    created_at: "2025-07-18T15:10:00Z",
    image_url: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=300",
    image_public_id: "relogio_casio_09",
    user_name: "Pedro Martins",
    status_name: "Disponível",
    condition: "Seminovo",
  },
];


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
      <Route element={<AuthPage isLogin={true} />} path={'/login'} />
      <Route element={<AuthPage />} path={'/register'} />
      <Route element={<RequestResetPasswordPage />} path={'/password/reset'} />
      <Route element={<ItemGrid items={items} />} path="/items"  />
      <Route element={<ResetPasswordPage />} path={'/reset-password'} />
    </Routes>
  );
}
