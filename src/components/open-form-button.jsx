import { useState } from 'react';
import CreateItemForm from './create-item-form';
import CreateProposalForm from './create-proposal-form';
import Modal from './modal';
import { Button } from './ui/button';

export default function OpenFormButton({ form }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* O botão que abre o modal */}
      <Button
        className="bg-indigo-600"
        onClick={() => setIsModalOpen(true)}
        type="button"
      >
        {form === 'Item' ? 'Publicar Item' : 'Criar Proposta'}
      </Button>

      {/* O Modal, que contém o formulário */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Publicar ${form}`}
      >
        {form === 'Item' ? (
          <CreateItemForm onSuccess={() => setIsModalOpen(false)} />
        ) : (
          <CreateProposalForm onSuccess={() => setIsModalOpen(false)} />
        )}
      </Modal>
    </>
  );
}
