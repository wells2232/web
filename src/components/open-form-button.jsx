import { useState } from 'react';
import CreateItemForm from './create-item-form';
import CreateProposalForm from './create-proposal-form';
import Modal from './modal';
import { Button } from './ui/button';

export default function OpenFormButton({ form, itemId, className }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* O botão que abre o modal */}
      <Button
        className={`bg-indigo-600 hover:bg-indigo-700 ${className}`}
        disabled={isModalOpen}
        onClick={() => setIsModalOpen(true)}
        type="button"
      >
        {form === 'Item' ? 'Publicar Item' : 'Criar Proposta'}
      </Button>

      {/* O Modal, que contém o formulário */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={form === 'Item' ? 'Publicar Item' : 'Criar Proposta'}
      >
        {form === 'Item' ? (
          <CreateItemForm onSuccess={() => setIsModalOpen(false)} />
        ) : (
          <CreateProposalForm
            itemId={itemId}
            onSuccess={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </>
  );
}
