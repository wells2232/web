import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { useUpdateUser } from '@/features/user/use-update-user';
import { useCitiesByState, useStates } from '@/hooks/use-location';
import { useAuthStore } from '@/stores/use-auth-store';

// Não precisamos mais importar o arquivo CSS:
// import './UserProfile.css';

const updateUserSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.').optional(),
  email: z.email('Email inválido.').min(1, 'O email é obrigatório.').optional(),
  city: z.string().min(1, 'A cidade é obrigatória.').optional(),
  state: z.string().min(1, 'O estado é obrigatório.').optional(),
});

export function UserProfileCopy() {
  const { user } = useAuthStore();
  const updateUserMutation = useUpdateUser({});

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      city: user?.city || '',
      state: user?.state || '',
    },
  });

  const userData = user || {};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const selectedState = watch('state');
  const { data: states = [], isLoading: isLoadingStates } = useStates();
  const { data: cities = [], isLoading: isLoadingCities } =
    useCitiesByState(selectedState);

  // Melhora: estado para mensagem com tipo (sucesso/erro)
  //const [feedback, setFeedback] = useState({ text: '', type: '' });

  const onSubmit = (validatedData) => {
    const data = {
      ...validatedData,
      userId: userData.id,
    };
    updateUserMutation.mutateAsync(data);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Senha alterada com sucesso!');
  };

  console.log('Dados do formulário:', form.getValues());
  console.log('Erros do formulário:', errors);
  return (
    // O JSX COM AS CLASSES DO TAILWIND
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-center font-bold text-3xl text-gray-800">
          Página do Usuário
        </h1>

        <div className="mb-8 rounded-lg border-blue-500 border-l-4 bg-gray-100 p-4">
          <p className="text-gray-700">
            <strong className="font-semibold">Nome:</strong> {userData.name}
          </p>
          <p className="text-gray-700">
            <strong className="font-semibold">Email:</strong> {userData.email}
          </p>
        </div>

        {/* --- Seção para Editar Nome --- */}
        <div className="mb-8">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }}
          >
            <div>
              <label
                className="mb-1 block font-medium text-gray-600 text-sm"
                htmlFor="name"
              >
                Novo Nome:
              </label>
              <input
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                id="name"
                name="name"
                {...register('name')}
                placeholder="Digite seu novo nome"
                type="text"
              />
            </div>
            {errors.name && (
              <p className=" text-red-800 text-xs">{errors.name.message}</p>
            )}
          </form>
        </div>

        {/* --- Seção para Editar Email --- */}
        <div className="mb-8">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                className="mb-1 block font-medium text-gray-600 text-sm"
                htmlFor="email"
              >
                Novo Email:
              </label>
              <input
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                id="email"
                name="email"
                placeholder="Digite seu novo e-mail"
                type="email"
                {...register('email')}
              />
            </div>
          </form>
        </div>
        <div className="mb-8">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                className="mb-1 block font-medium text-gray-600 text-sm"
                htmlFor="email"
              >
                Novo Estado:
              </label>
              <select
                id="state"
                name="state"
                {...register('state')}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              >
                <option className="bg-white pr-2 text-zinc-950" value="">
                  {isLoadingStates
                    ? 'Carregando estados...'
                    : 'Selecione seu estado'}
                </option>
                {states.map((state) => (
                  <option key={state.id} value={state.sigla}>
                    {state.nome}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="submit"
            >
              Salvar Informações
            </button>
          </form>
        </div>

        {/* --- Seção para Alterar Senha --- */}
        <div>
          <h2 className="mb-4 border-b pb-2 font-semibold text-gray-700 text-xl">
            Alterar Senha
          </h2>
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <div>
              <label
                className="mb-1 block font-medium text-gray-600 text-sm"
                htmlFor="currentPassword"
              >
                Senha Atual:
              </label>
              <input
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                id="currentPassword"
                name="currentPassword"
                placeholder="Sua senha atual"
                type="password"
              />
            </div>
            <div>
              <label
                className="mb-1 block font-medium text-gray-600 text-sm"
                htmlFor="newPassword"
              >
                Nova Senha:
              </label>
              <input
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                id="newPassword"
                name="newPassword"
                placeholder="Digite a nova senha"
                type="password"
              />
            </div>
            <div>
              <label
                className="mb-1 block font-medium text-gray-600 text-sm"
                htmlFor="confirmNewPassword"
              >
                Confirme a Nova Senha:
              </label>
              <input
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirme a nova senha"
                type="password"
              />
            </div>
            <button
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="submit"
            >
              Alterar Senha
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
