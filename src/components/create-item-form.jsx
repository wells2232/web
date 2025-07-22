import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCreateItem } from '@/features/items/hooks/use-create-item';
import { useItemFormData } from '@/features/items/hooks/use-item-formdata';
import { itemFormSchema } from '@/lib/form-schemas';

export default function CreateItemForm({ onSuccess }) {
  const { categories, conditions } = useItemFormData();
  const createItemMutation = useCreateItem({ onSuccess });
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(itemFormSchema),
    mode: 'onSubmit',
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    createItemMutation.mutate(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          className="mb-2 block font-semibold text-gray-700 text-sm"
          htmlFor="name"
        >
          Nome do Item
        </label>
        <input
          className=" w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-colors focus:border-indigo-600 focus:outline-none"
          id="name"
          name="name"
          {...register('name')}
          autoComplete="off"
          placeholder="Digite o nome do item"
          type="text"
        />
        {errors.name && (
          <p className=" text-red-800 text-xs">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          className="mb-2 block font-semibold text-gray-700 text-sm"
          htmlFor="description"
        >
          Descrição
        </label>
        <textarea
          className="w-full resize-none rounded-lg border-2 border-gray-200 px-4 py-3 transition-colors focus:border-indigo-600 focus:outline-none"
          id="description"
          name="description"
          {...register('description')}
          placeholder="Descreva o item"
          rows="3"
        />
        {errors.description && (
          <p className=" text-red-800 text-xs">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label
          className="mb-2 block font-semibold text-gray-700 text-sm"
          htmlFor="image"
        >
          Imagem
        </label>
        <input
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-colors file:mr-4 file:rounded-full file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700 focus:border-indigo-600 focus:outline-none"
          id="image"
          name="imagem"
          placeholder="Imagem do item"
          type="file"
          {...register('imageFile')}
        />
        {errors.imageFile && (
          <p className=" text-red-800 text-xs">{errors.imageFile.message}</p>
        )}
      </div>

      <div>
        <label
          className="mb-2 block font-semibold text-gray-700 text-sm"
          htmlFor="condition"
        >
          Condição
        </label>
        <select
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-colors focus:border-indigo-600 focus:outline-none"
          id="condition"
          name="condition"
          {...register('conditionId')}
        >
          <option value="">Selecione a condição</option>
          {conditions.map((condition) => (
            <option key={condition.id} value={condition.id}>
              {condition.condition}
            </option>
          ))}
        </select>
        {errors.conditionId && (
          <p className=" text-red-800 text-xs">{errors.conditionId.message}</p>
        )}
      </div>

      <div>
        <h2 className="mb-2 block font-semibold text-gray-700 text-sm">
          Categorias
        </h2>
        <div className="mt-2 grid grid-cols-1 gap-4 rounded-md border p-4 sm:grid-cols-2">
          {categories.map((cat) => (
            <div
              className="flex items-center rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
              key={cat.id}
            >
              <input
                className="mr-3 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-600"
                id={`category-${cat.id}`}
                type="checkbox"
                value={cat.id}
                {...register('categoryIds')}
              />
              <label
                className="cursor-pointer font-medium text-gray-700 text-sm"
                htmlFor={`category-${cat.id}`}
              >
                {cat.name}
              </label>
            </div>
          ))}
          {errors.categoryIds && (
            <p className=" text-red-800 text-xs">
              {errors.categoryIds.message}
            </p>
          )}
        </div>
      </div>

      <button
        className="w-full transform rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-lg text-white transition-colors hover:scale-105 hover:bg-indigo-700"
        disabled={createItemMutation.isPending}
        type="submit"
      >
        {createItemMutation.isPending ? (
          // 1. Use um container flex para alinhar o ícone e o texto
          <div className="flex items-center gap-2">
            <LoaderCircleIcon className="h-5 w-5 animate-spin" />
            <span>Criando Item...</span>
          </div>
        ) : (
          'Publicar Item'
        )}
      </button>
    </form>
  );
}
