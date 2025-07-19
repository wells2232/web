import { useState } from 'react';
import CreateItemForm from './create-item-form';
import Modal from './modal';

export default function CreateItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* O botão que abre o modal */}
      <button
        className="rounded-xl bg-green-700 p-4 duration-300 ease-out hover:scale-105 hover:bg-green-600"
        onClick={() => setIsModalOpen(true)}
        type="button"
      >
        + Criar Novo Item
      </button>

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
