import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

export default function ItemModal({ isOpen, onClose, item }) {
  const [selectedImage, setSelectedImage] = useState(item?.image_url);
  const modalRef = useRef();

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen || !item) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
      >
        {/* Botão X dentro do branco */}
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>

        {/* Imagem principal + miniaturas */}
        <div className="md:w-1/2 p-6 flex flex-col items-center">
          <img
            src={selectedImage}
            alt={item.nome}
            className="rounded-xl w-full object-cover aspect-square mb-4"
          />

        </div>

        {/* Informações do item */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <p className="uppercase text-orange-400 font-semibold tracking-widest text-sm mb-2">Item {item.status_name}</p>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{item.item_name}</h2>
            <p className="text-gray-600 text-2xl mb-4">{item.description}</p>
            
            <div className='mt-4 text-gray-700 '>
              <h5 className='font-bold'>Criado por:</h5>
              <p className="text-gray-600 mb-6">{item.user_name}</p>
            </div>
            <div className='mt-4 text-gray-700 '>
              <h5 className='font-bold'>Preferencias de troca:</h5>
              <p className="text-gray-600 mb-6">{item.exchange_preferences}</p>
            </div>
            <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mb-6">
              Condição: {item.condition}
            </span>
            
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-orange-300 hover:bg-orange-500 transition text-white font-bold py-3 px-6 rounded-xl"
            >
              Fazer Proposta
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')
  );
}
