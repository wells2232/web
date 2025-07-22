import { zodResolver } from '@hookform/resolvers/zod';
import { SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCreateItem } from '@/features/items/hooks/use-create-item';
import { useItemFormData } from '@/features/items/hooks/use-item-formdata';
import { itemFormSchema } from '@/lib/form-schemas';

import { Checkbox } from './ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem } from './ui/select';

export default function CreateItemForm({ onSuccess }) {
  const { categories, conditions, isLoading } = useItemFormData();
  const createItemMutation = useCreateItem({ onSuccess });

  const form = useForm({
    resolver: zodResolver(itemFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      description: '',
      conditionId: '',
      categoryIds: [], // Garante que categoryIds sempre comece como um array
      imageFile: null,
    },
  });

  const { register, handleSubmit, watch, setValue } = form;

  const selectedCategoryIds = watch('categoryIds') ?? [];

  const onSubmit = (data) => {
    createItemMutation.mutate(data);
  };

  if (createItemMutation.isSuccess) {
    return (
      <div className="text-center text-green-600">Item criado com sucesso!</div>
    );
  }

  const toggleCategory = (id) => {
    const alreadySelected = selectedCategoryIds.includes(id);
    const updated = alreadySelected
      ? selectedCategoryIds.filter((v) => v !== id)
      : [...selectedCategoryIds, id];
    setValue('categoryIds', updated);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          className="mb-2 block font-semibold text-gray-700 text-sm"
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Item</FormLabel>
              <FormControl>
                <input
                  className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-colors focus:border-indigo-600 focus:outline-none"
                  placeholder="Nome do item"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          className="mb-2 block font-semibold text-gray-700 text-sm"
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <textarea
                  className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-colors focus:border-indigo-600 focus:outline-none"
                  maxLength={200}
                  placeholder="Descrição do item"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          className="mb-2 block font-semibold text-gray-700 text-sm"
          control={form.control}
          name="imageFile"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <input
                  accept="image/*"
                  className="file:mr-4 file:rounded-full file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:font-semibold file:text-sm file:text-white file:hover:scale-105"
                  onChange={(e) => {
                    onChange(e.target.files[0]);
                  }}
                  type="file"
                  {...register('imageFile')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          className="mb-2 block font-semibold text-gray-700 text-sm"
          control={form.control}
          name="conditionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condição do Item</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-1/2 rounded-lg border-2 border-gray-200 bg-white p-2 pl-4 text-left text-zinc-900">
                    <SelectValue placeholder="Selecione a condição" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition.id} value={condition.id}>
                      {condition.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="max-w-sm">
          <Popover>
            <FormLabel>Categorias</FormLabel>

            <PopoverTrigger asChild>
              <button
                className="mt-2 w-1/2 rounded-lg border-2 border-gray-200 bg-white p-2 pl-4 text-left text-zinc-900"
                disabled={isLoading}
                type="button"
              >
                {selectedCategoryIds.length > 0
                  ? `${selectedCategoryIds.length} selecionada(s)`
                  : 'Selecione categorias'}
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-full">
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <div className="flex items-center gap-2" key={category.id}>
                    <Checkbox
                      checked={selectedCategoryIds.includes(category.id)}
                      id={category.id}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label htmlFor={category.id}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <button
          className="w-full transform rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-lg text-white transition-colors hover:scale-105 hover:bg-indigo-700"
          disabled={createItemMutation.isPending}
          type="submit"
        >
          {createItemMutation.isPending ? (
            <div className="flex items-center gap-2">
              <LoaderCircleIcon className="h-5 w-5 animate-spin" />
              <span>Criando Item...</span>
            </div>
          ) : (
            'Publicar Item'
          )}
        </button>
      </form>
    </Form>
  );
}
