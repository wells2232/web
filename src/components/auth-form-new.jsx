import { CircleUserRoundIcon, LockKeyholeIcon, MailIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
} from '../services/auth-service';
import { useAuthStore } from '../stores/use-auth-store';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Nome deve ter no mínimo 2 caracteres' })
    .default(''),
  email: z.email({ error: 'Por favor, insira um e-mail válido.' }).default(''),
  password: z
    .string()
    .min(6, { error: 'A Senha deve contém ao menos 6 catacteres' })
    .default(''),
});

const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export function AuthForm() {
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
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="mb-10 text-center text-3xl">
          {isLogin ? 'Entre com sua conta' : 'Criar Conta'}
        </h1>
        <form
          className="flex w-full max-w-lg items-center justify-center px-6"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-6">
            {!isLogin && (
              <div className="flex w-full flex-col gap-2">
                <label className="" htmlFor="name">
                  Nome
                </label>
                <div className="relative flex w-full items-center rounded-md ">
                  <CircleUserRoundIcon className=" absolute left-4" size={24} />
                  <input
                    className="w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 p-4 pl-12"
                    id="name"
                    name="name"
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    type="text"
                    value={formData.name}
                  />
                </div>

                {errors.name && (
                  <p className="mt-1 text-red-900 text-xs">{errors.name[0]}</p>
                )}
              </div>
            )}

            <div className="flex w-full flex-col gap-2">
              <label htmlFor="email">Email</label>
              <div className="relative flex w-full items-center rounded-md">
                <MailIcon className="absolute left-4" size={24} />
                <input
                  className="w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 in-autofill:bg-zinc-900 p-4 pl-12"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Digite seu e-mail"
                  type="text"
                  value={formData.email}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-red-900 text-xs">{errors.email[0]}</p>
              )}
            </div>
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password">Senha</label>
                <Link className="text-sm text-zinc-300" to={'/reset-password'}>
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative flex w-full items-center rounded-md">
                <LockKeyholeIcon className="absolute left-4" size={24} />
                <input
                  className="w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 p-4 pl-12 text-z"
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-red-900 text-xs">
                  {errors.password[0]}
                </p>
              )}
            </div>
            <button
              className="mt-6 w-full max-w-md rounded-full border border-zinc-400 bg-white p-4 font-semibold text-black transition-transform hover:scale-103 hover:cursor-pointer"
              type="submit"
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </div>
        </form>
        <div>
          <p className="mt-6 text-center text-gray-400 text-sm">
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
      <div className="hidden h-full w-full items-center justify-center bg-[url(/auth-bg-2.png)] bg-auto md:block" />
    </div>
  );
}
