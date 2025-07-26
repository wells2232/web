import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createProposal } from '@/services/proposal-service';

export function useCreateProposal({ onSuccess }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (proposalData) => {
      return createProposal(proposalData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['proposals']);
      if (onSuccess) {
        onSuccess(data);
        toast.success('Proposta enviada com sucesso!', {
          richColors: true,
        });
      }
    },
    onError: (error) => {
      const { message } = error.response?.data || {};
      toast.error(message || 'Erro ao enviar proposta. Tente novamente.', {
        duration: 2000,
        richColors: true,
      });
    },
  });
}
