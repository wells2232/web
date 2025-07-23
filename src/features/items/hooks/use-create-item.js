import { useMutation, useQueryClient } from '@tanstack/react-query';
import imageCompression from 'browser-image-compression';
import { createItem } from '@/services/item-service';
import {
  getCloudinarySignature,
  uploadToCloudinary,
} from '@/services/upload-service';

export function useCreateItem({ onSuccess: onFormSuccess }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formDataFromHook) => {
      const imageFile = formDataFromHook.imageFile;

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedImage = await imageCompression(imageFile, options);
      const { signature, timestamp } = await getCloudinarySignature();
      const cloudinaryData = await uploadToCloudinary(
        compressedImage,
        signature,
        timestamp
      );

      const finalItemData = {
        item_name: formDataFromHook.name,
        description: formDataFromHook.description,
        conditionId: formDataFromHook.conditionId,
        categoryIds: formDataFromHook.categoryIds,
        imageUrl: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
      };

      return createItem(finalItemData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });

      if (onFormSuccess) {
        onFormSuccess();
      }
    },
  });
}
