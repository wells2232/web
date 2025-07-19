import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '@/services/item-service';

export function useItems(filters) {
  return useQuery({
    // A queryKey agora inclui os filtros. Se eles mudarem, a busca é refeita.
    queryKey: ['items', filters],
    queryFn: () => fetchItems(filters),
    keepPreviousData: true, // Ótimo para paginação e filtros
  });
}
