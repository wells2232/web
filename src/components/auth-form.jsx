import { LockKeyholeIcon, MailIcon } from 'lucide-react';
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
    <div className="w-full max-w-3/4 overflow-hidden rounded-xl shadow-2xl md:max-w-3/4 lg:max-w-2/3">
      <div className="flex flex-col md:flex-row">
        <div className=" w-full bg-orange-200 p-8 text-zinc-900 md:w-1/2 md:p-12">
          <h2 className="mb-6 text-center font-bold text-2xl text-gray-800">
            {isLogin ? 'Login' : 'Crie sua Conta'}
          </h2>
          <form
            className="flex flex-col gap-4"
            noValidate
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <div>
                <label
                  className="mb-2 block font-semibold text-sm"
                  htmlFor="name"
                >
                  Nome
                </label>
                <input
                  className="w-full rounded-md bg-white px-4 py-3 text-black transition focus:outline-none focus:ring-2 focus:ring-amber-600 "
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Seu nome"
                  type="text"
                  value={formData.name}
                />
                {errors.name && (
                  <p className="mt-1 text-red-900 text-xs">{errors.name[0]}</p>
                )}
              </div>
            )}

            <div>
              <label
                className="mb-2 block font-semibold text-sm"
                htmlFor="email"
              >
                E-mail
              </label>
              <div className="relative flex w-full items-center rounded-md bg-white ">
                <MailIcon className="absolute left-2" size={16} />
                <input
                  className=" h-8 w-full items-center pl-8 text-black text-xs transition focus:outline-none focus:ring-2 focus:ring-amber-600 "
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="email@exemplo.com"
                  required
                  type="email"
                  value={formData.email}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-red-900 text-xs">{errors.email[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block font-semibold text-sm"
                htmlFor="password"
              >
                Senha
              </label>
              <div className=" relative flex w-full items-center rounded-md bg-white ">
                <LockKeyholeIcon className="absolute left-2" size={16} />
                <input
                  className=" h-8 w-full items-center pl-8 text-black transition focus:outline-none focus:ring-2 focus:ring-amber-600 "
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  type="password"
                  value={formData.password}
                />
              </div>

              {errors && (
                <p className="mt-1 text-red-900 text-xs">{errors.password}</p>
              )}
              <Link
                className="flex justify-end pt-1 pr-1 text-right text-sky-700 text-xs underline"
                to={'/forgot-password'}
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              className="w-full transform rounded-lg bg-amber-600 px-4 py-3 font-bold text-white transition-transform hover:scale-102 hover:cursor-pointer hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              type="submit"
            >
              {isLogin ? 'Entrar' : 'Registrar'}
            </button>
            <div>
              <p className="mt-2 text-center text-gray-600 text-sm">
                {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
                <button
                  className="font-medium text-amber-500 hover:text-amber-700 "
                  onClick={toggleForm}
                  type="button"
                >
                  {isLogin ? 'Registre-se' : 'Faça login'}
                </button>
              </p>
            </div>
          </form>
        </div>
        <div className=" w-full bg-gradient-to-br from-indigo-500 to-emerald-500 md:w-1/2 md:p-12" />
        <div />
      </div>
    </div>
  );
}
