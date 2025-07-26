import { useMutation, useQueryClient } from '@tanstack/react-query';
import { declineProposal } from '@/services/proposal-service';

export const useDeclineProposals = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (proposalId) => declineProposal(proposalId),
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
