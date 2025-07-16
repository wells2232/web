import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import z from 'zod';
import { AuthForm } from '../../components/auth-form';
import { resetPassword } from '../../services/auth-service';

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { error: 'A Senha deve conter ao menos 6 catacteres' })
      .default(''),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  //window.history.replaceState({}, '', '/reset-password');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const prettyErrors = z.flattenError(result.error).fieldErrors;
      setErrors(prettyErrors);
    }
    const validatedData = result.data;

    try {
      await resetPassword(token, validatedData.password);
      setSuccess(true);
    } catch (err) {
      if (err.response?.data?.error) {
        // 1. Pega os erros estruturados da API
        const backendErrors = { message: err.response.data.error };

        setErrors(backendErrors);
      }
    }
  };

  if (errors.message) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center">
        <div className=" flex w-full flex-col items-center justify-center gap-6">
          <AuthForm
            infoText={
              'Por favor, solicite um novo link de redefinição de senha'
            }
            onPrimaryAction={() => navigate('/password/reset')}
            primaryActionText={'Redefinir senha'}
            title={'Token inválido ou expirado'}
          />
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center">
        <div className=" flex w-full flex-col items-center justify-center gap-6">
          <AuthForm
            infoText={'Clique no botão abaixo e entre com sua nova senha'}
            onPrimaryAction={() => navigate('/auth')}
            primaryActionText={'Login'}
            title={'Senha redefinida com sucesso'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center">
      <div className=" flex w-full flex-col items-center justify-center gap-6">
        <AuthForm
          infoText={'Digite sua nova senha abaixo'}
          onPrimaryAction={handleSubmit}
          primaryActionText={'Alterar senha'}
          title={'Alterar Senha'}
        >
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password">Nova Senha</label>
            </div>
            <div className=" flex w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 ">
              <input
                className="w-full p-4 pl-12"
                name="password"
                onChange={handleInputChange}
                placeholder="••••••••"
                type="password"
                value={formData.password}
              />
            </div>
            {errors.confirmPassword && (
              <p className=" text-red-800 text-xs">
                {errors.confirmPassword[0]}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password">Confirmar Nova Senha</label>
            </div>
            <div className=" flex w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 ">
              <input
                className="w-full p-4 pl-12"
                name="confirmPassword"
                onChange={handleInputChange}
                placeholder="••••••••"
                type="password"
                value={formData.confirmPassword}
              />
            </div>
            {errors.confirmPassword && (
              <p className=" text-red-800 text-xs">
                {errors.confirmPassword[0]}
              </p>
            )}
          </div>
        </AuthForm>
      </div>

      <div className="hidden h-full w-full items-center justify-center bg-[url(/auth-bg-2.png)] bg-auto md:block" />
    </div>
  );
}
