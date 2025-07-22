import { BadgeInfo } from 'lucide-react';

export default function ItemCard({ item_name, description, condition, image_url, onClick }) {
  const iconColorClass =
    condition === 'Novo'
      ? 'text-green-600'
      : condition === 'Seminovo'
      ? 'text-yellow-500'
      : 'text-gray-600';

  const badgeClass =
    condition === 'Novo'
      ? 'bg-green-300 text-green-700'
      : condition === 'Seminovo'
      ? 'bg-yellow-300 text-yellow-500'
      : 'bg-gray-700 text-gray-700';

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between h-full relative transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
      {/* Selo de condição */}
      <span className="absolute top-4 left-4 border border-gray-300 bg-white px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
        <BadgeInfo className={iconColorClass} size={16} />
        <span className={iconColorClass}>{condition}</span>
      </span>

      {/* Imagem */}
      <div className="w-full h-60 overflow-hidden rounded-xl mb-4">
        <img src={image_url} alt={item_name} className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Conteúdo do card */}
      <div className="flex flex-col gap-2 flex-grow">
        <h2 className="text-black text-xl font-bold">{item_name}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {/* Botão */}
      <button
        onClick={onClick}
        className="mt-4 self-end px-4 py-2 text-white bg-orange-300 hover:bg-orange-500 rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-103"
      >
        Veja Mais
      </button>
    </div>
  );
}
