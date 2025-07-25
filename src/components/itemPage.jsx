import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import ItemConditionBadge from '@/components/item-condition-badge';
import ItemStatusBadge from '@/components/item-status-badge';
import OpenFormButton from '@/components/open-form-button';
import { fetchItemById } from '@/services/item-service';
import { useAuthStore } from '@/stores/use-auth-store';

export function ItemDetailPage() {
  const { isAuthenticated } = useAuthStore();
  const { id } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ['item', id],
    queryFn: () => fetchItemById(id),
  });

  const item = data || {};
  const user = item.user || {};
  if (!item.id) {
    return <div className="container mx-auto my-8">Item not found</div>;
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Conteúdo Principal */}
          <div className="lg:w-2/3">
            {/* Imagem Destacada */}
            <div className="mb-4 flex items-center justify-center rounded-2xl ">
              <picture>
                <img
                  alt={item.itemName}
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                  src={item.imageUrl}
                />
              </picture>
            </div>

            {/* Informações do Item */}
            <div className="rounded-2xl border-2 border-zinc-200 p-8 shadow-lg ">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h1 className="font-semibold text-3xl text-gray-800">
                    {item.itemName}
                  </h1>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Publicado por{' '}
                    <span className="font-medium text-gray-900">
                      {user.name}
                    </span>
                  </p>
                </div>
                <ItemStatusBadge status={item.status} />
              </div>

              <div className="prose dark:prose-invert mb-8 max-w-none">
                <p className="text-gray-600 ">{item.description}</p>
              </div>

              <div className="border-gray-200 border-t pt-6 dark:border-gray-700">
                <h3 className="mb-4 font-medium text-gray-900">
                  Condição do Item
                </h3>
                <ItemConditionBadge condition={item.condition} />
              </div>
            </div>
          </div>

          {/* Sidebar Minimalista */}
          <div className="lg:w-1/3">
            <div className="sticky top-12">
              {/* Card de Informações */}
              <div className="mb-6 rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-lg">
                <h4 className="mb-4 font-medium text-gray-900">
                  Informações Rápidas
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm ">Categoria</p>
                    <p className="text-gray-900 ">{item.categories[0].name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm ">Localização</p>
                    <p className="text-gray-900 ">
                      {' '}
                      {`${user.city}, ${user.state}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm ">Postado em</p>
                    <p className="text-gray-900 ">{item.createdAt}</p>
                  </div>
                </div>
              </div>
              {/* Card de Ação Principal */}
              <div className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-lg ">
                {isAuthenticated ? (
                  <div className="flex flex-col items-center space-y-4 ">
                    <h4 className="text-center font-medium ">
                      Gostou deste item? Faça uma proposta!
                    </h4>
                    <OpenFormButton
                      className={'w-full'}
                      form="proposal"
                      itemId={item.id}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-center font-medium ">
                      Gostou deste item?
                    </h4>
                    <p className="text-center text-gray-600 text-sm ">
                      Faça login para realizar uma proposta
                    </p>
                    <div className="space-y-3">
                      <Link
                        className="block w-full rounded-lg border border-indigo-600 px-4 py-3 text-indigo-600 transition hover:bg-indigo-600 hover:text-white "
                        search={{ redirect: `/items/${item.id}` }}
                        to="/login"
                      >
                        Entrar na Conta
                      </Link>
                      <Link
                        className="block w-full rounded-lg border bg-indigo-600 px-4 py-3 text-white transition hover:bg-indigo-800"
                        search={{ redirect: `/items/${item.id}` }}
                        to="/register"
                      >
                        Criar Nova Conta
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
