import { useState } from 'react';
import CreateItemForm from './create-item-form';
import Modal from './modal';
import { Button } from './ui/button';

export default function CreateItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* O botão que abre o modal */}
      <Button
        className="bg-indigo-600"
        onClick={() => setIsModalOpen(true)}
        type="button"
      >
        + Criar Novo Item
      </Button>

      {/* O Modal, que contém o formulário */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={'Cadastrar Item'}
      >
        <CreateItemForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
