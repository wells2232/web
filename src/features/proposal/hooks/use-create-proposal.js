import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProposal } from '@/services/proposal-service';

export function useCreateProposal({ onSuccess }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (proposalData) => {
      console.log('Creating proposal with data:', proposalData);
      return createProposal(proposalData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['proposals']);
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
}
