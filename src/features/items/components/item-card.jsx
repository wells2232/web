import { CircleSmallIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ItemCard({ item }) {
  const primaryCategory = item.categories?.[0]?.name || 'Sem Categoria';

  return (
    // O Link faz com que o card inteiro seja clicável e navegável
    <Link className="group block overflow-hidden" to={`/items/${item.id}`}>
      <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
        {/* Container da Imagem */}
        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
          <picture>
            <source media="(min-width: 1024px)" srcSet={item.imageUrl} />
            <img
              alt={item.itemName}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              src={item.imageUrl}
            />
          </picture>
        </div>

        {/* Container do Conteúdo */}
        <div className="flex flex-grow flex-col p-4">
          {/* Categoria */}
          <p className="font-semibold text-blue-600 text-xs uppercase tracking-wider">
            {primaryCategory}
          </p>

          {/* Nome do Item */}
          <h3 className="mt-2 truncate font-bold text-gray-900 text-lg">
            {item.itemName}
          </h3>
          <h3 className="mt-2 truncate text-wrap text-gray-900 text-sm ">
            {item.description}
          </h3>
          {/* Descrição - usando flex-grow para empurrar a condição para baixo */}
          <div className="mt-1 flex w-fit items-center justify-center gap-2 rounded-full bg-green-400 px-2 py-1">
            <CircleSmallIcon size={16} />
            <p className=" flex-grow text-black text-sm">
              {item.condition.name}
            </p>
          </div>

          {/* Dono do Item */}
          <div className="mt-4 border-gray-100 border-t pt-4">
            <p className="text-gray-500 text-xs">
              Disponibilizado por:{' '}
              <span className="font-medium text-gray-700">
                {item.user.name}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
