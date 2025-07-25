import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchReceivedProposals,
  fetchUserProposals,
} from '@/services/proposal-service';

export function useProposals(userId) {
  const queryClient = useQueryClient();

  return useQuery(['proposals'], fetchUserProposals, {
    onSuccess: (data) => {
      queryClient.setQueryData(['proposals'], data);
    },
  });
}

export function useReceivedProposals() {
  const queryClient = useQueryClient();

  return useQuery(['receivedProposals'], fetchReceivedProposals, {
    onSuccess: (data) => {
      queryClient.setQueryData(['receivedProposals'], data);
    },
  });
}
