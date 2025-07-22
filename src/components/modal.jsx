import { XIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const prevFocusedElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      prevFocusedElement.current = document.activeElement; // Salva o elemento focado antes de abrir
      modalRef.current?.focus(); // Move o foco para o modal
    }
    return () => {
      prevFocusedElement.current?.focus(); // Restaura o foco ao fechar
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    // Overlay (fundo escuro)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* Container do Modal (para o conteúdo não fechar ao ser clicado) */}
      <div
        className=" relative max-h-[90vh] w-full max-w-xs overflow-auto rounded-2xl bg-white p-6 text-black shadow-2xl md:max-w-lg"
        ref={modalRef}
        role="dialog"
        tabIndex={-1}
      >
        {/* Cabeçalho com Título e Botão de Fechar */}

        <div className="mb-4 flex items-center justify-between pb-3">
          <h2 className=" w-full border-indigo-600 border-b-4 pb-3 text-center font-bold text-2xl text-indigo-600">
            {title}
          </h2>
          <button
            className="font-bold text-2xl text-black"
            onClick={onClose}
            type="button"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        {/* Conteúdo do Modal (nosso formulário virá aqui) */}
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById('portal-root') // Certifique-se de ter <div id="portal-root"></div> no seu index.html
  );
}
