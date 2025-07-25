import { useNavigate, useSearch } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import CreateItemForm from '@/components/create-item-form';
import { FilterBar } from '@/features/items/components/filter-bar';
import { HeroSection } from '@/features/items/components/hero-section';
import { ItemGrid } from '@/features/items/components/ItemsGrid';
//import ItemGrid from '@/features/items/components/item-grid';
import { useItems } from '@/features/items/hooks/use-items';

export function HomePage() {
  const search = useSearch({
    strict: false, // permite usar chaves opcionais
  });
  const navigate = useNavigate();

  const filters = {
    //verifica se é mobile ou desktop e se adapta page e limit
    page: Number(search.page) || 1,
    limit: 12,
    categorySlug: search.category || '',
    conditionSlug: search.condition || '',
    search: search.search || '',
    orderBy: search.orderBy || 'created_at',
    orderDirection: search.orderDirection || 'desc',
  };

  const { data, isLoading, isError, error, isFetching } = useItems(filters);

  const items = data?.items || [];
  const totalPages = data?.totalPages || 0;

  const handleFilterChange = (filterKey, value) => {
    let newSearch = { ...search };

    console.log('newSearch', newSearch, typeof newSearch);

    if (filterKey === 'reset') {
      // Se for um reset, limpamos todos os filtros
      newSearch = {};
    } else if (value) {
      newSearch[filterKey] = value;
    } else {
      delete newSearch[filterKey];
    }

    newSearch.page = 1;

    navigate({
      to: '/',
      search: newSearch,
    });
  };

  const handlePageChange = (newPage) => {
    const newSearch = { ...search, page: newPage };
    navigate({
      to: '/',
      search: newSearch,
    });
  };

  return (
    <div className="mx-auto space-y-8 md:max-w-[1204px]">
      <div className="mx-auto flex w-fit" hidden>
        <CreateItemForm />
      </div>
      <HeroSection
        isFetching={isFetching}
        onFilterChange={handleFilterChange}
      />
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <div className="mb-10 flex flex-col items-center justify-center">
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
              <ItemGrid
                filters={filters}
                items={items}
                onPageChange={handlePageChange}
                totalPages={totalPages}
              />
            ) : (
              <div className="py-16 text-center">
                <p className="text-gray-500 text-xl">Nenhum item encontrado.</p>
                <p className="mt-2 text-gray-400">
                  Tente ajustar seus filtros ou termo de busca.
                </p>
              </div>
            )}

            {/* Controles de Paginação */}
          </>
        )}
      </div>
    </div>
  );
}
