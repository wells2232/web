import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptProposal } from '@/services/proposal-service';

export const useAcceptProposal = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (proposalId) => acceptProposal(proposalId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['receivedProposals']);
      queryClient.invalidateQueries(['proposals']);
      onSuccess(data);
    },
    onError: (error) => {
      console.error('Error accepting proposal:', error);
    },
  });
};
