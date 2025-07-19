import { useQuery } from '@tanstack/react-query';
import {
  fetchCategories,
  fetchItemConditions,
} from '@/services/meta-data-service';

export function useItemFormData() {
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  const { data: conditions, isLoading: isLoadingConditions } = useQuery({
    queryKey: ['itemConditions'],
    queryFn: fetchItemConditions,
    staleTime: 5 * 60 * 1000,
  });

  return {
    categories: categories || [],
    conditions: conditions || [],
    isLoading: isLoadingCategories || isLoadingConditions,
  };
}
