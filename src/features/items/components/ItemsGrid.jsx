import ItemCard from '../../../components/ItemCard'; // ou ajuste o caminho conforme a pasta

export function ItemGrid({ items, totalPages, onPageChange, filters }) {
  return (
    <div className="flex w-full flex-col p-8 text-zinc-900">
      <div className=" items-center p-10 align-middle">
        <h1 className="flex justify-center font-bold font-sans text-6xl">
          Lista de Itens
        </h1>
        <h2 className="mt-6 flex justify-center text-center font-serif text-xl leading-relaxed">
          Conheça os itens disponíveis para troca e encontre exatamente o que
          você precisa.
        </h2>
      </div>

      <div className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 ">
        {items.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </div>

      {/* Botões de navegação de página */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          className={`rounded-lg px-4 py-2 text-white ${
            filters.page === 0
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-orange-600 hover:bg-orange-700'
          }`}
          disabled={filters.page === 0}
          onClick={() => onPageChange(filters.page - 1)}
          type="button"
        >
          Anterior
        </button>
        <span className="text-black text-lg">
          Página {filters.page} de {totalPages}
        </span>
        <button
          className={`rounded-lg px-4 py-2 text-white ${
            filters.page === totalPages - 1
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-orange-600 hover:bg-orange-700'
          }`}
          disabled={filters.page >= totalPages}
          onClick={() => onPageChange(filters.page + 1)}
          type="button"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
