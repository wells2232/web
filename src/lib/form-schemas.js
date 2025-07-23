import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const itemFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  description: z
    .string()
    .min(1, 'A descrição deve ter no mínimo 1 caracteres.'),
  statusId: z.uuid().optional(),
  conditionId: z.uuid({ error: 'Condição é obrigatória' }),
  categoryIds: z.array(z.uuid()).min(1, 'Selecione pelo menos uma categoria.'),
  imageFile: z.preprocess(
    (arg) => {
      return arg?.[0];
    },
    z
      .file({ message: 'A imagem é obrigatória.' })
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        'O tamanho máximo da imagem é 5MB.'
      )
      .refine(
        (file) => IMAGE_TYPES.includes(file.type),
        'Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos.'
      )
  ),
});

export const proposalFormSchema = z.object({
  message: z.string().min(1, 'A mensagem é obrigatória.'),
  itemId: z.uuid('ID do item inválido.'),
  offeredItemsIds: z.array(z.uuid()).min(1, 'Selecione pelo menos um Item.'),
});
