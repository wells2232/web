import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useCitiesByState, useStates } from '@/hooks/use-location';
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
  state: z.string().min(2, { error: 'Selecione um estado' }).default(''),
  city: z.string().min(2, { error: 'Selecione uma cidade' }).default(''),
});

const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export function AuthPage({ isLogin = false }) {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      state: '',
      city: '',
    },
  });

  const selectedState = watch('state');
  const { data: states = [], isLoading: isLoadingStates } = useStates();
  const { data: cities = [], isLoading: isLoadingCities } =
    useCitiesByState(selectedState);

  const onSubmit = async (validatedData) => {
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
      if (error.response?.data?.message) {
        // Exibir mensagem de erro para o usuário
        alert(error.response.data.message);
      } else {
        alert('Ocorreu um erro ao processar sua solicitação. Tente novamente.');
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
          onPrimaryAction={handleSubmit(onSubmit)}
          primaryActionText={isLogin ? 'Entrar' : 'Registrar'}
          title={isLogin ? 'Entre com sua conta' : 'Crie sua conta'}
        >
          <div className="flex w-full flex-col gap-6">
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nome</label>
                <div className=" flex w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 ">
                  <input
                    autoCapitalize="words"
                    className="w-full p-4 pl-12"
                    id="name"
                    name="name"
                    placeholder="Nome"
                    type="text"
                    {...register('name')}
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
                  autoComplete="email"
                  className=" w-full p-4 pl-12 "
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className=" text-red-800 text-xs">{errors.email[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password">Senha</label>
                {isLogin && (
                  <Link
                    className="text-sm text-zinc-300"
                    to={'/password/reset'}
                  >
                    Esqueceu a senha?
                  </Link>
                )}
              </div>
              <div className=" flex w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 ">
                <input
                  className="w-full p-4 pl-12"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  {...register('password')}
                />
              </div>

              {errors.password && (
                <p className=" text-red-800 text-xs">{errors.password[0]}</p>
              )}
            </div>
            {!isLogin && (
              <div className="flex w-full justify-between gap-4">
                <div className="flex w-1/2 flex-col gap-2">
                  <label htmlFor="state">Estado</label>
                  <div className=" flex w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 ">
                    <select
                      id="state"
                      name="state"
                      {...register('state')}
                      className="w-full p-2 "
                    >
                      <option className="bg-zinc-900 pr-2" value="">
                        {isLoadingStates
                          ? 'Carregando estados...'
                          : 'Selecione seu estado'}
                      </option>
                      {states.map((state) => (
                        <option
                          className="bg-zinc-900"
                          key={state.id}
                          value={state.sigla}
                        >
                          {state.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex w-1/2 flex-col gap-2">
                  <label htmlFor="city">Cidade</label>
                  <div className=" flex w-full max-w-md rounded-md border border-zinc-400 bg-zinc-900 ">
                    <select
                      id="city"
                      name="city"
                      {...register('city')}
                      className="w-full bg-transparent p-2"
                    >
                      <option className=" bg-zinc-900 pr-2 " value="">
                        {isLoadingCities
                          ? 'Carregando cidades...'
                          : 'Selecione sua cidade'}
                      </option>
                      {cities.map((city) => (
                        <option
                          className=" bg-zinc-900 pr-2"
                          key={city.id}
                          value={city.nome}
                        >
                          {city.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.city && (
                    <p className=" text-red-800 text-xs">{errors.city[0]}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </AuthForm>
        <div>
          <p className=" text-center text-gray-400 text-sm">
            {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            <button
              className=" text-white hover:cursor-pointer hover:font-semibold"
              onClick={() => navigate(isLogin ? '/register' : '/login')}
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
