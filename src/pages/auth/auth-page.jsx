import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AuthForm } from '../../components/auth-form';
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
} from '../../services/auth-service';
import { useAuthStore } from '../../stores/use-auth-store';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Nome deve ter no mínimo 2 caracteres' })
    .default(''),
  email: z.email({ error: 'Por favor, insira um e-mail válido.' }).default(''),
  password: z
    .string()
    .min(6, { error: 'A Senha deve conter ao menos 6 catacteres' })
    .default(''),
});

const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const { login } = useAuthStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const schema = isLogin ? loginSchema : registerSchema;
    const result = schema.safeParse(formData);

    if (!result.success) {
      const prettyErrors = z.flattenError(result.error).fieldErrors;

      setErrors(prettyErrors);
    }

    const validatedData = result.data;

    try {
      if (isLogin) {
        await loginUser(validatedData);
        const currentUser = await fetchCurrentUser();
        login(currentUser);
        navigate('/');
      } else {
        await registerUser(validatedData);
        const currentUser = await fetchCurrentUser();
        login(currentUser);
        navigate('/');
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        // 1. Pega os erros estruturados da API
        const backendErrors = error.response.data.errors;

        setErrors(backendErrors);
      }
    }
  };

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center">
      <div className=" flex w-full flex-col items-center justify-center gap-6">
        <AuthForm
          infoText={
            isLogin
              ? 'Por favor, insira suas credenciais'
              : 'Por favor, preencha os campos abaixo'
          }
          onPrimaryAction={handleSubmit}
          primaryActionText={isLogin ? 'Entrar' : 'Registrar'}
          secondaryActionText="Criar uma conta"
          title={isLogin ? 'Entre com sua conta' : 'Crie sua conta'}
        >
          <div className="flex w-full flex-col gap-6">
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nome</label>
                <div className=" flex w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 ">
                  <input
                    className="w-full p-4 pl-12"
                    name="name"
                    onChange={handleInputChange}
                    placeholder="Nome"
                    type="text"
                  />
                </div>
                {errors.name && (
                  <p className=" text-red-800 text-xs">{errors.name[0]}</p>
                )}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <div className=" flex w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 ">
                <input
                  className="w-full p-4 pl-12"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Email"
                  type="email"
                />
              </div>
              {errors.email && (
                <p className=" text-red-800 text-xs">{errors.email[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password">Senha</label>
                <Link className="text-sm text-zinc-300" to={'/password/reset'}>
                  Esqueceu a senha?
                </Link>
              </div>
              <div className=" flex w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 ">
                <input
                  className="w-full p-4 pl-12"
                  name="password"
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              {errors.password && (
                <p className=" text-red-800 text-xs">{errors.password[0]}</p>
              )}
            </div>
          </div>
        </AuthForm>
        <div>
          <p className=" text-center text-gray-400 text-sm">
            {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            <button
              className=" text-white hover:cursor-pointer hover:font-semibold"
              onClick={toggleForm}
              type="button"
            >
              {isLogin ? 'Registre-se' : 'Faça login'}
            </button>
          </p>
        </div>
      </div>
      <div className=" h-full w-full items-center justify-center bg-[url(/auth-bg-2.png)] bg-auto md:flex" />
    </div>
  );
}
