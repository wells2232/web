import { MoveRight, User } from 'lucide-react';
import { create } from 'zustand';
export function ProposalModal({ proposal, isOpen, onClose }) {
  if (!(isOpen && proposal)) {
    return null;
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between border-b pb-4">
          <div>
            <h2 className="font-semibold text-xl">Detalhes da Proposta</h2>
            <div className="text-gray-500 text-sm">
              {formatarData(proposal.createdAt)}
            </div>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 font-medium text-sm text-yellow-800">
              ⏳ {proposal.status}
            </span>
          </div>
        </div>

        {/* Usuários */}
        <div className="flew-row mt-4 mb-4 flex justify-center gap-10">
          <div className="flex min-w-40 flex-col justify-center rounded-lg bg-gray-100 pl-5 align-middle ">
            <div className="font-medium text-gray-500 text-lg">
              <User />
            </div>
            <p className="font-semibold text-gray-800">{proposal}</p>
          </div>
          <div>
            <MoveRight color={'gray'} size={100} />
          </div>
          <div className="flex min-w-40 flex-col justify-center rounded-lg bg-gray-100 pl-5 align-middle ">
            <div className="font-normal text-gray-500 text-sm ">
              <User />{' '}
            </div>
            <p className="font-semibold text-gray-800">
              {proposal.destinatario.nome}
            </p>
          </div>
        </div>

        {/* Itens da troca */}
        <div className="mb-6 rounded-xl bg-blue-50 p-5">
          <h3 className="mb-4 font-medium text-gray-700">Itens da Troca</h3>
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Item Oferecido */}
            <div className="rounded-lg bg-white p-4 shadow">
              <img
                alt="Item oferecido"
                className="mb-3 h-32 w-full rounded object-cover"
                src={proposal.itemOferecido.imagem}
              />
              <h4 className="font-semibold">{proposal.itemOferecido.nome}</h4>
              <p className="mb-2 text-gray-600 text-sm">
                {proposal.itemOferecido.descricao}
              </p>
              <div className="flex gap-2 text-xs">
                <span className="rounded bg-gray-100 px-2 py-1 text-gray-700">
                  {proposal.itemOferecido.categoria}
                </span>
                <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                  {proposal.itemOferecido.condicao}
                </span>
              </div>
            </div>

            {/* Seta */}
            <div className="text-center text-3xl text-gray-400">➡️</div>

            {/* Item Desejado */}
            <div className="rounded-lg bg-white p-4 shadow">
              <img
                alt="Item desejado"
                className="mb-3 h-32 w-full rounded object-cover"
                src={proposal.itemDesejado.imagem}
              />
              <h4 className="font-semibold">{proposal.itemDesejado.nome}</h4>
              <p className="mb-2 text-gray-600 text-sm">
                {proposal.itemDesejado.descricao}
              </p>
              <div className="flex gap-2 text-xs">
                <span className="rounded bg-gray-100 px-2 py-1 text-gray-700">
                  {proposal.itemDesejado.categoria}
                </span>
                <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                  {proposal.itemDesejado.condicao}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagem */}
        <div className="mb-6 rounded-lg border p-4">
          <h3 className="mb-2 font-medium text-gray-700">
            <bold>Mensagem</bold>{' '}
          </h3>
          <p className="text-gray-600 text-sm">{proposal.mensagem}</p>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4">
          <button
            className="rounded border border-red-500 px-6 py-2 text-red-600 transition hover:bg-red-600 hover:text-white"
            onClick={onClose}
          >
            Recusar Proposta
          </button>
          <button
            className="rounded bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
            onClick={() => alert('Aceitou a proposta!')}
          >
            Aceitar Proposta
          </button>
        </div>
      </div>
    </div>
  );
}
