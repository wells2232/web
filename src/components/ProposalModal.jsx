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
      <div className="flex flex-row flex-wrap justify-center min-h-20 align-middle">
        <div className="flex flex-col flex-wrap">
          <div className="mt-4 mb-4 flex flex-row flex-wrap justify-center gap-10 w-full">
            <div className="flex flex-col flex-1 items-center justify-center gap-3 rounded-lg bg-gray-100 px-6 py-4 min-h-[120px] min-w-90 max-w-100">
              <h1>Quem fez a proposta:</h1>
              <div className="flex flex-row items-center gap-2">
                <User className="text-gray-500" />
                <p className="font-semibold text-gray-800">
                  {proposal.proposer.name}
                </p>
              </div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-center gap-3 rounded-lg bg-gray-100 px-6 py-4 min-h-[120px] min-w-100">
              <h1>Quem recebeu a proposta:</h1>
              <div className="flex flex-row items-center gap-2">
                <User className="text-gray-500" />
                <p className="font-semibold text-gray-800">
                  {proposal.targetItem.user.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itens da troca */}
      <div className="mb-6 rounded-xl bg-blue-50 p-5">
        <div className=" items-center gap-4">
          <h1>Itens Oferecidos:</h1>
          <div className=" gap-10 flex flex-row flex-wrap justify-center">
            {proposal.offeredItems.map((item) => (
              <div
                className="rounded-lg bg-white p-4 shadow w-50 flex-wrap"
                key={item.id}
              >
                <picture>
                  <img
                    alt="Item oferecido"
                    className="mb-3 h-32 w-full rounded object-cover"
                    src={item.imageUrl}
                  />
                </picture>
                <h4 className="font-semibold mb-4">{item.itemName}</h4>

                <ItemConditionBadge condition={item.condition.name} />
              </div>
            ))}
          </div>

          {/* Item Desejado */}
          <h1 className="mt-5 font-20">Item desejado: </h1>
          <div className=" gap-10 flex flex-row justify-center">
            <div className="rounded-lg bg-white w-50 p-4 shadow items-center">
              <picture>
                <img
                  alt="Item desejado"
                  className="mb-3 h-32 w-full rounded object-cover"
                  src={proposal.targetItem.imageUrl}
                />
              </picture>
              <h4 className="font-semibold mb-4">
                {proposal.targetItem.itemName}
              </h4>
              <div className="flex gap-2 text-xs">
                <ItemConditionBadge condition={proposal.targetItem.condition} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mensagem */}
      <div className="mb-6 rounded-xl bg-gray-100 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-500 mb-1">Mensagem</h3>
        <p className="text-base text-gray-700">{proposal.message}</p>
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
