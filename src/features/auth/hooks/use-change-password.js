import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { changePassword } from '@/services/auth-service';

export function useChangePassword() {
  return useMutation({
    mutationFn: (data) => {
      console.log('Changing password with:', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      return changePassword(data.currentPassword, data.newPassword);
    },
    onSuccess: () => {
      toast.success('Senha alterada com sucesso!', {
        richColors: true,
      });
    },
    onError: (error) => {
      const message = error.response?.data.error || {};
      toast.error(message || 'Erro ao alterar senha. Tente novamente.', {
        duration: 2000,
        richColors: true,
      });
    },
  });
}
