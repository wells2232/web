import { zodResolver } from '@hookform/resolvers/zod';
import { Check, LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useUserItems } from '@/features/items/hooks/use-items';
import { useCreateProposal } from '@/features/proposal/hooks/use-create-proposal';
import { proposalFormSchema } from '@/lib/form-schemas';
import { useAuthStore } from '@/stores/use-auth-store';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

const ItemCard = ({ item, isSelected, toggleItem }) => {
  return (
    <button
      className={`flex cursor-pointer items-center rounded-lg border p-3 transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:bg-gray-50'
      }`}
      onClick={() => toggleItem(item.id)}
      type="button"
    >
      <picture>
        <img
          alt={item.itemName}
          className="mr-3 h-12 w-12 rounded-md object-cover"
          src={item.imageUrl}
        />
      </picture>
      <span className="font-medium text-gray-800 text-sm">{item.itemName}</span>
      {isSelected && <Check className="ml-auto h-5 w-5 text-blue-500" />}
    </button>
  );
};

export default function CreateProposalForm({ onSuccess, itemId }) {
  const { user } = useAuthStore();
  const { userItems, isLoading } = useUserItems(user?.id);
  const createProposalMutation = useCreateProposal({ onSuccess });
  const form = useForm({
    resolver: zodResolver(proposalFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      message: '',
      itemId,
      offeredItemsIds: [],
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const offeredItemsIds = watch('offeredItemsIds') ?? [];

  const onSubmit = (formData) => {
    createProposalMutation.mutate(formData);
  };

  const toggleItem = (id) => {
    const alreadySelected = offeredItemsIds.includes(id);
    const updated = alreadySelected
      ? offeredItemsIds.filter((v) => v !== id)
      : [...offeredItemsIds, id];
    setValue('offeredItemsIds', updated);
  };

  console.log('Offered items IDs:', offeredItemsIds);
  console.log('Erros:', errors);

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          className="mb-2 block font-semibold text-gray-700 text-sm"
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <textarea
                  className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-colors focus:outline-none"
                  maxLength={200}
                  placeholder="Mensagem"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="max-w-sm">
          <FormLabel>Items Oferecidos</FormLabel>

          <Dialog>
            <DialogTrigger asChild>
              <button
                className="mt-2 rounded-lg border-2 border-gray-200 p-2"
                disabled={isLoading}
                type="button"
              >
                Adicionar Item
              </button>
            </DialogTrigger>
            <DialogContent className={'text-zinc-900'}>
              <DialogHeader>
                <DialogTitle>Selecione os Items</DialogTitle>
                <DialogDescription>
                  Selecione os itens que deseja oferecer para troca
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 overflow-y-auto">
                {userItems.map((item) => (
                  <div className="grid max-h-96 gap-2" key={item.id}>
                    <ItemCard
                      isSelected={offeredItemsIds.includes(item.id)}
                      item={item}
                      toggleItem={toggleItem}
                    />
                  </div>
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button">Confirm</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <FormLabel>Items Selecionados</FormLabel>
          <div className="mt-4 flex flex-col space-y-2">
            {offeredItemsIds.map((id) => {
              const item = userItems.find((i) => i.id === id);
              return (
                <div
                  className="flex items-center justify-between gap-4 rounded-lg border p-2"
                  key={id}
                >
                  <Checkbox
                    checked={offeredItemsIds.includes(id)}
                    onCheckedChange={() => toggleItem(id)}
                  />
                  <span className="p w-full text-left font-medium text-gray-800 text-sm">
                    {item?.itemName || 'Item removido'}
                  </span>
                </div>
              );
            })}
          </div>
          {errors.offeredItemsIds && (
            <p className="mt-1 text-red-500 text-xs">
              {errors.offeredItemsIds.message}
            </p>
          )}
        </div>

        <button
          className=" w-full transform rounded-lg bg-indigo-600 py-3 font-semibold text-lg text-white transition-colors hover:cursor-pointer hover:bg-indigo-700"
          disabled={createProposalMutation.isPending}
          type="submit"
        >
          {createProposalMutation.isPending ? (
            <div className="flex items-center justify-center gap-2">
              <LoaderCircleIcon className="h-5 w-5 animate-spin" />
              <span>Criando proposta...</span>
            </div>
          ) : (
            'Enviar proposta'
          )}
        </button>
      </form>
    </Form>
  );
}
