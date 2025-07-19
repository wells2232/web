import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/auth-service';
import { useAuthStore } from '../stores/use-auth-store';

export function NavBar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/');
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <>
      console.error('Erro ao deslogar usuário:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto w-full max-w-[1204px] px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <Link className="font-bold text-2xl text-blue-600 " to="/">
            Trade Circle
          </Link>
          <nav className="hidden items-center space-x-6 md:flex">
            {isAuthenticated ? (
              <>
                <Link
                  className=" border-transparent border-b-2 text-black hover:border-b-sky-500 hover:text-sky-500"
                  to="/proposals/received"
                >
                  Minhas Propostas
                </Link>
                <span className="text-gray-700">Olá, {user.name}!</span>
                <button
                  className="rounded-md bg-red-500 px-4 py-2 text-white hover:cursor-pointer hover:bg-red-600"
                  onClick={handleLogout}
                  type="button"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  className="text-black text-sm hover:text-sky-500"
                  to="/login"
                >
                  Entrar
                </Link>
                <Link
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  to="/register"
                >
                  Cadastrar-se
                </Link>
              </>
            )}
          </nav>
          <div className="md:hidden">
            <button
              aria-label="Abrir menu"
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
              onClick={() => setisMenuOpen(!isMenuOpen)}
              type="button"
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="border-gray-200 border-t bg-white md:hidden">
          <nav className="flex flex-col space-y-2 p-4">
            {isAuthenticated ? (
              <>
                <span className="px-2 py-1 font-bold text-gray-800">
                  Olá, {user?.name}!
                </span>
                <button
                  className="rounded px-2 py-1 text-left text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                  type="button"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  className="rounded px-2 py-1 text-gray-600 hover:bg-gray-100"
                  to="/login"
                >
                  Entrar
                </Link>
                <Link
                  className="rounded bg-blue-600 px-2 py-1 text-center text-white hover:bg-blue-700"
                  to="/register"
                >
                  Cadastrar-se
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
