import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateUser } from '@/services/auth-service';

export function useUpdateUser() {
  //const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => {
      console.log(
        'Atualizando usuário com ID:',
        userData.userId,
        'e dados:',
        userData
      );
      updateUser(userData);
    },
    onSuccess: (data) => {
      toast.success('Perfil atualizado com sucesso!', {
        richColors: true,
      });
    },
  });
}
