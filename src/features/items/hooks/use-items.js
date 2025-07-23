import { useQuery } from '@tanstack/react-query';
import { fetchItems, fetchUserItems } from '@/services/item-service';

export function useItems(filters) {
  return useQuery({
    // A queryKey agora inclui os filtros. Se eles mudarem, a busca é refeita.

    queryKey: ['items', filters],
    queryFn: () => fetchItems(filters),
    keepPreviousData: true, // Ótimo para paginação e filtros
  });
}

export const useUserItems = (userId) => {
  const { data: userItems, isLoading } = useQuery({
    queryKey: ['userItems', userId],
    queryFn: () => fetchUserItems(userId),
    enabled: !!userId, // Só executa a query se userId estiver definido
  });
  return { userItems: userItems || [], isLoading };
};
