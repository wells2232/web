import { useEffect, useState } from 'react';
import { reverseGeocode } from '@/services/geolocation-service';

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // A função 'getCurrentPosition' pede a permissão ao usuário
    navigator.geolocation.getCurrentPosition(
      // 1. Callback de SUCESSO
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const locationData = await reverseGeocode(latitude, longitude);
          setLocation(locationData);
        } catch (err) {
          setError('Não foi possível traduzir as coordenadas.', err);
        } finally {
          setIsLoading(false);
        }
      },
      // 2. Callback de ERRO (ex: usuário negou a permissão)
      (geoError) => {
        setError(geoError.message);
        setIsLoading(false);
      }
    );
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  return { location, isLoading, error };
}
