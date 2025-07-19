import { useQuery } from '@tanstack/react-query';
import { fetchCitiesByState, fetchStates } from '@/services/locationService';

export function useStates() {
  return useQuery({
    queryKey: ['states'],
    queryFn: fetchStates,
  });
}

export function useCitiesByState(stateUf) {
  return useQuery({
    queryKey: ['cities', stateUf],
    queryFn: () => fetchCitiesByState(stateUf),
    enabled: !!stateUf, // Só busca se stateUf estiver definido
  });
}
