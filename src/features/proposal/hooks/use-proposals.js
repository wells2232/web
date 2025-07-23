import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProposals } from '@/services/proposal-service';

export function useProposals() {
  const queryClient = useQueryClient();

  return useQuery(['proposals'], fetchProposals, {
    onSuccess: (data) => {
      queryClient.setQueryData(['proposals'], data);
    },
  });
}
