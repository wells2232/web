import { useAuthStore } from '@/stores/use-auth-store';

export function HeroSection({ onFilterChange, isFetching }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <section className="rounded-lg bg-white px-4 py-16 text-center shadow-md">
        <div className="container mx-auto">
          <h1 className="font-extrabold text-4xl text-gray-800 tracking-tight md:text-5xl">
            Sua Próxima Descoberta está a uma Troca de Distância.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 text-lg">
            Dê um novo propósito aos seus objetos e encontre tesouros escondidos
            na sua comunidade.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <input
                className="w-full rounded-full border-2 border-gray-300 p-4 pl-5 text-lg focus:border-blue-500 focus:ring-blue-500"
                name="search"
                onChange={(e) => onFilterChange('search', e.target.value)}
                placeholder="Ex: Bicicleta, Cadeira de escritório, Jogo de tabuleiro..."
                type="text"
              />
              {isFetching && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <input />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
