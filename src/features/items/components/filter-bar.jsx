import { useSearchParams } from 'react-router-dom';
import CreateItem from '@/components/create-Item-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuthStore } from '@/stores/use-auth-store';
import { useItemFormData } from '../hooks/use-item-formdata';

export function FilterBar({ filters, handleFilterChange }) {
  const { isAuthenticated } = useAuthStore();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const {
    categories,
    conditions,
    isLoading: isLoadingFilters,
  } = useItemFormData();

  return (
    <div className="mt-4 rounded-lg border border-zinc-800 p-6">
      <div className="flex w-full items-center justify-between gap-4 text-zinc-900 md:w-auto">
        <div className="flex items-center gap-4">
          <Select
            onValueChange={(value) => handleFilterChange('categoryId', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Teste" />
            </SelectTrigger>
            <SelectContent className="overflow-hidden rounded-md bg-white text-zinc-900 ">
              {categories.map((cat) => (
                <SelectItem
                  className="hover:bg-indigo-500"
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.category_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => handleFilterChange('conditionId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent className={'text-zinc-900'}>
              {conditions.map((condition) => (
                <SelectItem key={condition.id} value={condition.id}>
                  {condition.condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>{isAuthenticated && <CreateItem />}</div>
      </div>
    </div>
  );
}
