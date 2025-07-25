import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
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
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, [setUser, logout, navigate]);

  return { isLoading };
}
