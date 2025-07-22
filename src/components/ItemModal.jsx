import ReactDOM from 'react-dom';

export default function ItemModal({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    // Overlay (fundo escuro)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-colors
      ${ sOpen ? 'visible bg-black/20' : 'invisible '}"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {/* Container do Modal (para o conteúdo não fechar ao ser clicado) */}
      <div
        className=" relative max-h-[90vh] w-full max-w-xs overflow-auto rounded-2xl bg-white p-6 text-black shadow-2xl md:max-w-lg"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        role="button"
        tabIndex={0}
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
            &times;
          </button>
        </div>
        
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById('portal-root') // Certifique-se de ter <div id="portal-root"></div> no seu index.html
  );
}
