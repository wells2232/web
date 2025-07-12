import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../../src/services/auth-service';
import { useAuthStore } from './../stores/use-auth-store';

export function useInitializeAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          navigate('/');
        }
      } catch (_err) {
        // Se der erro (ex: 401, token inválido), garante que o usuário está deslogado
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, [setUser, logout, navigate]); // Dependências do useEffect

  return { isLoading };
}
