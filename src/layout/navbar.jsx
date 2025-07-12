import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/auth-service';
import { useAuthStore } from '../stores/use-auth-store';

export function NavBar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/auth');
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <>
      console.error('Erro ao deslogar usuário:', error);
    }
  };

  return (
    <div className="hidden border-collapse border-b bg-zinc-900 p-4 text-white md:mx-auto md:flex md:h-fit md:w-full">
      <div className="flex w-full items-center justify-between">
        <Link className="font-bold text-lg " to="/">
          Trade Circle
        </Link>
        <div className="text-sm">
          {isAuthenticated ? (
            <div className="flex items-center space-x-6 ">
              <Link
                className="rounded-lg hover:text-sky-500"
                to="/proposals/received"
              >
                Minhas Propostas
              </Link>
              <span className="">Olá, {user.name}!</span>
              <button
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:cursor-pointer hover:bg-red-600"
                onClick={handleLogout}
                type="button"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link className="text-sm hover:text-sky-500" to="/auth">
                Entrar
              </Link>
              <Link
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                to="/register"
              >
                Cadastrar-se
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
