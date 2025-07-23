import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';

export default function ItemCard({ item, onClick }) {
  const { imageUrl, itemName, condition, categories } = item;
  console.log('Categorias', categories);

  const primaryCategory = categories[0] || { name: 'Sem Categoria' };

  /*const iconColorClass =
    condition.name === 'Novo'
      ? 'text-green-600'
      : condition.name === 'Usado - Como Novo'
        ? 'text-yellow-500'
        : 'text-gray-600';*/

  let badgeClass = 'bg-gray-700 text-gray-700';
  if (condition.name === 'Novo') {
    badgeClass = 'bg-green-300 text-green-700';
  } else if (condition.name === 'Usado - Como Novo') {
    badgeClass = 'bg-yellow-300 text-yellow-500';
  }

  return (
    <Link
      className="hover:-translate-y-1 relative flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105"
      to={`/items/${item.id}`}
    >
      {/* Imagem */}
      <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
        <picture>
          <source media="(min-width: 1024px)" srcSet={imageUrl} />
          <img
            alt={itemName}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            src={imageUrl}
          />
        </picture>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-grow flex-col gap-2">
          <h2 className="font-bold font-sans text-black text-xl">{itemName}</h2>
        </div>

        {/* Botão */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-2">
            <Badge>{primaryCategory.name}</Badge>
            <Badge className={`${badgeClass} text-white text-xs`}>
              {condition.name}
            </Badge>
          </div>

          <button
            className="hover:-translate-y-1 mt-4 self-end rounded-lg bg-orange-300 px-4 py-2 text-white transition delay-150 duration-300 ease-in-out hover:scale-103 hover:bg-orange-500"
            onClick={onClick}
            type="button"
          >
            Veja Mais
          </button>
        </div>
      </div>
      {/* Conteúdo do card */}
    </Link>
  );
}
