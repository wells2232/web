import { useState } from 'react';
import ItemCard from '../../components/ItemCard'; // ou ajuste o caminho conforme a pasta
import ItemModal from '../../components/ItemModal';
import CallToAction from '@/components/ContainerNewItem';


export function ItemGrid({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const goToPrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  

  return (
    <div className="p-8 flex flex-col bg-[#b8d4d8c3] w-full">
      <div className=' p-10  items-center align-middle'>
        <h1 className="text-6xl font-bold flex justify-center text-white font-sans">Lista de Itens</h1>
        <h2 className="text-xl leading-relaxed  mt-6 flex justify-center text-white text-center font-serif">
          Conheça os itens disponíveis para troca e encontre exatamente o que você precisa.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6 w-full ">
        {paginatedItems.map((item) => (
          <ItemCard
            key={item.id}
            item_name={item.item_name}
            description={item.description}
            condition={item.condition}
            image_url={item.image_url}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>
  {selectedItem && (
      <ItemModal
    isOpen={selectedItem !== null}
    onClose={() => setSelectedItem(null)}
    item={selectedItem}
  >
    <div className="text-sm text-gray-800">
      <p><strong>Descrição:</strong> {selectedItem.description}</p>
      <p><strong>Condição:</strong> {selectedItem.condition}</p>
      <p><strong>Status:</strong> {selectedItem.status_name}</p>
      <p><strong>Usuário:</strong> {selectedItem.user_name}</p>
      <p><strong>Preferência de troca:</strong> {selectedItem.exchange_preferences}</p>
      <img src={selectedItem.image_url} alt={selectedItem.item_name} className="w-full mt-4 rounded-md" />
    </div>
  </ItemModal>
  
)}
      
      <CallToAction />

      {/* Botões de navegação de página */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={goToPrevious}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-lg text-white ${
            currentPage === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
          }`}
        >
          Anterior
        </button>
        <span className="text-lg text-black">Página {currentPage + 1} de {totalPages}</span>
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 rounded-lg text-white ${
            currentPage === totalPages - 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
          }`}
        >
          Próxima
        </button>
      </div>

          {/* MODAL */}
      
    </div>
  );
}
