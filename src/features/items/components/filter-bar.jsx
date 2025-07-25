import { FilterXIcon, Loader2 } from 'lucide-react';
import OpenFormButton from '@/components/open-form-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuthStore } from '@/stores/use-auth-store';
import { useItemFormData } from '../hooks/use-item-formdata';

export function FilterBar({ filters, onFilterChange }) {
  const { isAuthenticated } = useAuthStore();
  const { categories, conditions, isLoadingFilters } = useItemFormData();

  if (isLoadingFilters) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  console.log('FilterBar filters:', filters);

  return (
    <div className=" py-10 border-b-2 border-gray-200 ">
      <div className="flex w-full flex-wrap items-center justify-between gap-4 text-zinc-900 md:w-auto">
        <div className="flex flex-wrap items-center gap-4 md:flex ">
          <Select
            disabled={isLoadingFilters}
            onValueChange={(slug) =>
              onFilterChange('category', slug === 'all' ? '' : slug)
            }
            value={filters?.categorySlug || 'all'}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categorias" />
            </SelectTrigger>
            <SelectContent className="overflow-hidden rounded-md bg-white text-zinc-900 ">
              <SelectItem value="all">Todas Categorias</SelectItem>
              {categories.map((cat) => (
                <SelectItem
                  className="hover:bg-indigo-500"
                  key={cat.id}
                  value={cat.slug}
                >
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            disabled={isLoadingFilters}
            onValueChange={(slug) =>
              onFilterChange('condition', slug === 'all' ? '' : slug)
            }
            value={filters?.conditionSlug || 'all'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Condição" />
            </SelectTrigger>
            <SelectContent className={'text-zinc-900'}>
              <SelectItem value="all">Todas Condições</SelectItem>
              {conditions.map((condition) => (
                <SelectItem key={condition.id} value={condition.slug}>
                  {condition.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            disabled={isLoadingFilters}
            onValueChange={(value) => onFilterChange('orderDirection', value)}
            value={filters?.orderDirection || 'desc'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent className={'text-zinc-900'}>
              <SelectItem value="desc">Mais Recentes</SelectItem>
              <SelectItem value="asc">Mais Antigos</SelectItem>
            </SelectContent>
          </Select>
          <div className="">
            <button
              className="flex items-center gap-2 hover:cursor-pointer hover:text-indigo-600"
              onClick={
                () => onFilterChange('reset', true) // Chama a função de reset
              }
              type="button"
            >
              <FilterXIcon />
              Limpar Filtros
            </button>
          </div>
        </div>

        <div>{isAuthenticated && <OpenFormButton form={'Item'} />}</div>
      </div>
    </div>
  );
}
