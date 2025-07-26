import { MoveRight, User } from 'lucide-react';
import { useAcceptProposal } from '@/features/proposal/hooks/use-accept-proposal';
import { useAuthStore } from '@/stores/use-auth-store';
import ItemConditionBadge from './item-condition-badge';
import Modal from './modal';

export function ProposalModal({ onSuccess, proposal, isOpen, onClose }) {
  const acceptProposalMutation = useAcceptProposal({ onSuccess });
  const { user } = useAuthStore();

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

  const handleAcceptProposal = (proposalId) => {
    acceptProposalMutation.mutate(proposalId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="flex flex-col items-start justify-between border-b pb-4">
        <div>
          <h2 className="font-semibold text-xl">Detalhes da Proposta</h2>
          <div className="text-gray-500 text-sm">
            {formatarData(proposal.createdAt)}s
          </div>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 font-medium text-sm text-yellow-800">
            ⏳ {proposal.status}
          </span>
        </div>
      </div>

      {/* Usuários */}
      <div className="mt-4 mb-4 flex flex-row justify-center gap-10">
        <div className="flex min-w-40 flex-col justify-center rounded-lg bg-gray-100 pl-5 align-middle ">
          <div className="font-medium text-gray-500 text-lg">
            <User />
          </div>
          <p className="font-semibold text-gray-800">{proposal.proposerName}</p>
        </div>
        <div>
          <MoveRight color={'gray'} size={100} />
        </div>
        <div className="flex min-w-40 flex-col justify-center rounded-lg bg-gray-100 pl-5 align-middle ">
          <div className="font-normal text-gray-500 text-sm ">
            <User />{' '}
          </div>
          <p className="font-semibold text-gray-800">
            {proposal.targetItem.user.name}
          </p>
        </div>
      </div>

      {/* Itens da troca */}
      <div className="mb-6 rounded-xl bg-blue-50 p-5">
        <h3 className="mb-4 font-medium text-gray-700">Itens da Troca</h3>
        <div className="grid grid-cols-3 items-center gap-4">
          {/* Item Oferecido */}
          {proposal.offeredItems.map((item) => (
            <div className="rounded-lg bg-white p-4 shadow" key={item.id}>
              <picture>
                <img
                  alt="Item oferecido"
                  className="mb-3 h-32 w-full rounded object-cover"
                  src={item.imageUrl}
                />
              </picture>
              <h4 className="font-semibold">{item.itemName}</h4>
              <p className="mb-2 text-gray-600 text-sm">{item.description}</p>

              <ItemConditionBadge condition={item.condition.name} />
            </div>
          ))}

          {/* Seta */}
          <div className="text-center text-3xl text-gray-400">➡️</div>

          {/* Item Desejado */}
          <div className="rounded-lg bg-white p-4 shadow">
            <picture>
              <img
                alt="Item desejado"
                className="mb-3 h-32 w-full rounded object-cover"
                src={proposal.targetItem.imageUrl}
              />
            </picture>
            <h4 className="font-semibold">{proposal.targetItem.item_name}</h4>
            <p className="mb-2 truncate text-gray-600 text-sm">
              {proposal.targetItem.description}
            </p>
            <div className="flex gap-2 text-xs">
              <ItemConditionBadge
                condition={proposal.targetItem.condition.name}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mensagem */}
      <div className="mb-6 rounded-lg border p-4">
        <h3 className="mb-2 font-medium text-gray-700">
          <bold>Mensagem</bold>{' '}
        </h3>
        <p className="text-gray-600 text-sm">{proposal.message}</p>
      </div>

      {/* Botões */}
      {proposal.proposer.id !== user.id && (
        <div className="flex justify-end gap-4">
          <button
            className="rounded border border-red-500 px-6 py-2 text-red-600 transition hover:bg-red-600 hover:text-white"
            onClick={onClose}
            type="button"
          >
            Recusar Proposta
          </button>
          <button
            className="rounded bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
            onClick={() => handleAcceptProposal(proposal.id)}
            type="button"
          >
            Aceitar Proposta
          </button>
        </div>
      )}
    </Modal>
  );
}
