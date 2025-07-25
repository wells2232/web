import { Link, useNavigate } from '@tanstack/react-router';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuIcon,
  UserCircle2Icon,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';
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
      console.error('Erro ao fazer logout:', error);
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
                  className=" border-transparent border-b-2 text-black hover:border-b-indigo-600 hover:text-indigo-600"
                  to="/proposals/received"
                >
                  Minhas Propostas
                </Link>
                <div className="group relative inline-block items-center gap-2 py-2">
                  <button
                    className="flex items-center gap-2 hover:cursor-pointer"
                    type="button"
                  >
                    <ChevronDownIcon className="ml-1 inline-block group-hover:hidden" />
                    <ChevronUpIcon className="ml-1 hidden group-hover:inline-block" />
                    <span className="text-gray-700">Olá, {user.name}!</span>
                    <UserCircle2Icon className=" text-indigo-500" size={32} />
                  </button>

                  <div
                    className="absolute top-full z-10 box-border hidden w-48 rounded-sm border border-zinc-400 py-1 font-medium shadow-lg backdrop-blur-[5px] group-hover:block"
                    id="user-menu"
                  >
                    <Link
                      className="block border-b not-last:border-b-zinc-400 px-4 py-2 text-gray-200 text-sm hover:text-white "
                      to={`/users/${user.id}`}
                    >
                      Meu Perfil
                    </Link>
                    <button
                      className="block w-full px-4 py-2 text-left text-red-700 hover:cursor-pointer hover:text-red-500"
                      onClick={handleLogout}
                      type="button"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  className="font-semibold text-sm text-zinc-600 hover:text-indigo-800"
                  to="/login"
                >
                  Entrar
                </Link>
                <Link
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                  to="/auth/register"
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
                <Link
                  className="flex items-center gap-2 border-b px-2 pb-2 hover:cursor-pointer"
                  to={`/users/${user.id}`}
                >
                  <span className="text-gray-700">Olá, {user.name}!</span>
                  <UserCircle2Icon className="text-gray-600" size={32} />
                </Link>
                <Link
                  className="border-transparent border-b-2 px-2 pt-2 text-black hover:border-b-indigo-600 hover:text-indigo-600"
                  to="/proposals/received"
                >
                  Minhas Propostas
                </Link>
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
