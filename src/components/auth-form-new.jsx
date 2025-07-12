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
    <div className="flex h-[100dvh] w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-center text-3xl">
          {isLogin ? 'Entre com sua conta' : 'Criar Conta'}
        </h1>
        <div className="flex flex-col ">
          {!isLogin && (
            <div>
              <label
                className="mb-2 block font-semibold text-sm"
                htmlFor="name"
              >
                Nome
              </label>
              <input
                className="bg-white"
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
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center bg-[url(/auth-bg-2.png)] bg-auto" />
    </div>
  );
}
