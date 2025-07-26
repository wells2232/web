import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateUser } from '@/services/auth-service';

export function useUpdateUser() {
  //const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => updateUser(userData),
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!', {
        richColors: true,
      });
    },
    onError: (error) => {
      const { error: message } = error.response?.data || {};
      console.log('Erro ao atualizar perfil:', error);
      toast.error(message || 'Erro ao atualizar perfil. Tente novamente.', {
        richColors: true,
      });
    },
  });
}
