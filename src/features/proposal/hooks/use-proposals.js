import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchReceivedProposals,
  fetchUserProposals,
} from '@/services/proposal-service';

export function useProposals(userId) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['proposals', userId],
    queryFn: () => fetchUserProposals(userId),
    onSuccess: (data) => {
      queryClient.setQueryData(['proposals', userId], data);
    },
    keepPreviousData: true,
  });
}

export function useReceivedProposals() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['receivedProposals'],
    queryFn: fetchReceivedProposals,
    onSuccess: (data) => {
      queryClient.setQueryData(['receivedProposals'], data);
    },
    keepPreviousData: true,
  });
}
