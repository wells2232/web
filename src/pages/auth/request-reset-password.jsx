import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { AuthForm } from '../../components/auth-form';
import { requestResetPassword } from '../../services/auth-service';

const resetPasswordSchema = z.object({
  email: z
    .email({ error: 'Por favor, insira um e-mail válido.' })
    .nonempty({ error: 'O e-mail é obrigatório.' }),
});

export function RequestResetPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '' });
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ email: value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
      const prettyErrors = z.flattenError(result.error).fieldErrors;
      setError(prettyErrors);
      return;
    }

    const { email: validatedEmail } = result.data;

    try {
      await requestResetPassword(validatedEmail);
      setEmailSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center">
      <div className=" flex w-full flex-col items-center justify-center gap-6">
        {emailSent ? (
          <AuthForm
            infoText={
              'Enviamos um link para redefinição de senha em seu e-mail, por favor, verifique sua caixa de entrada'
            }
            onSecondaryAction={() => navigate('/auth')}
            secondaryActionText={'Voltar para login'}
            title={'Verifique seu e-mail'}
          />
        ) : (
          <AuthForm
            infoText="Digite seu e-mail e enviaremos um link para redefinição de senha"
            onPrimaryAction={handleSubmit}
            onSecondaryAction={() => navigate('/auth')}
            primaryActionText={'Resetar senha'}
            secondaryActionText={'Voltar para Login'}
            title="Recuperar Senha"
          >
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="email">Email</label>
              <div className=" flex w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 ">
                <input
                  className="w-full p-4 pl-12"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Email"
                  type="email"
                />
                {error && <p className="mt-1 text-red-900 text-xs">{error}</p>}
              </div>
            </div>
          </AuthForm>
        )}
      </div>

      <div className="hidden h-full w-full items-center justify-center bg-[url(/auth-bg-2.png)] bg-auto md:block" />
    </div>
  );
}
