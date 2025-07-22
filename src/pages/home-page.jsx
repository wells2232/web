import { Loader2 } from 'lucide-react';

import { useSearchParams } from 'react-router-dom';
import CreateItemForm from '@/components/create-item-form';
import { FilterBar } from '@/features/items/components/filter-bar';
import { HeroSection } from '@/features/items/components/hero-section';
import ItemGrid from '@/features/items/components/item-grid';
import { useItems } from '@/features/items/hooks/use-items';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = {
    //verifica se é mobile ou desktop e se adapta page e limit
    page: Number(searchParams.get('page')) || 1,
    limit: 12,
    categorySlug: searchParams.get('category') || '',
    conditionSlug: searchParams.get('condition') || '',
    search: searchParams.get('search') || '',
    orderBy: searchParams.get('orderBy') || 'created_at',
    orderDirection: searchParams.get('orderDirection') || 'desc',
  };

  const { data, isLoading, isError, error, isFetching } = useItems(filters);

  const items = data?.items || [];
  const totalPages = data?.totalPages || 0;

  const handleFilterChange = (filterKey, value) => {
    // Criamos uma cópia dos parâmetros atuais da URL
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(filterKey, value);
    } else {
      // Se o valor for vazio, removemos o parâmetro da URL
      newParams.delete(filterKey);
    }

    if (filterKey === 'reset') {
      // Se for um reset, limpamos todos os filtros
      newParams.delete('category');
      newParams.delete('condition');
      newParams.delete('search');
      newParams.delete('orderBy');
      newParams.delete('orderDirection');
      newParams.set('page', '1'); // Sempre volta para a página 1,
      newParams.delete('reset');
    }
    // Sempre volta para a página 1 ao aplicar um novo filtro
    newParams.set('page', '1');
    // Atualiza a URL
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage);
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-8">
      <div className="mx-auto flex w-fit" hidden>
        <CreateItemForm />
      </div>
      <HeroSection
        isFetching={isFetching}
        onFilterChange={handleFilterChange}
      />
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <div>
        {/* Mostra um spinner grande apenas no carregamento inicial */}
        {isLoading && (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin" />
          </div>
        )}

        {isError && (
          <p className="text-center text-red-500">
            Erro ao carregar itens...{' '}
            {error?.message || 'Tente novamente mais tarde.'}
          </p>
        )}

        {!(isLoading || isError) && (
          <>
            {items.length > 0 ? (
              <ItemGrid items={items} />
            ) : (
              <div className="py-16 text-center">
                <p className="text-gray-500 text-xl">Nenhum item encontrado.</p>
                <p className="mt-2 text-gray-400">
                  Tente ajustar seus filtros ou termo de busca.
                </p>
              </div>
            )}

            {/* Controles de Paginação */}
            {items.length > 0 && (
              <div className="mt-12 mb-4 flex items-center justify-center gap-4">
                <button
                  className="text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                  disabled={filters.page <= 1}
                  onClick={() => handlePageChange(filters.page - 1)}
                  type="button"
                >
                  Anterior
                </button>
                <span className="font-semibold text-gray-700 ">
                  Página {filters.page} de {totalPages}
                </span>
                <button
                  className="text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                  disabled={filters.page >= totalPages}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(filters.page + 1);
                  }}
                  type="button"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
