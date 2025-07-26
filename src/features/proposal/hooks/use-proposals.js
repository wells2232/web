import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchReceivedProposals,
  fetchUserProposals,
} from '@/services/proposal-service';

export function useProposals() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['proposals'],
    queryFn: () => fetchUserProposals(),
    onSuccess: (data) => {
      queryClient.setQueryData(['proposals'], data);
    },
    keepPreviousData: true,
  });
}

export function useReceivedProposals() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['receivedProposals'],
    queryFn: () => fetchReceivedProposals(),
    onSuccess: (data) => {
      queryClient.setQueryData(['receivedProposals'], data);
    },
    keepPreviousData: true,
  });
}
