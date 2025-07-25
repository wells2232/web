import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  BadgeCheck,
  Clock,
  XCircle,
  ArrowRight,
  Inbox,
  Send,
} from 'lucide-react';
import { ProposalList } from '@/components/ProposalList';
import { ProposalModal } from '@/components/ProposalModal';
import { useReceivedProposals } from '@/features/proposal/hooks/use-proposals';

const statusStyles = {
  Pendente: 'bg-yellow-100 text-yellow-800',
  Aceita: 'bg-green-100 text-green-800',
  Recusada: 'bg-red-100 text-red-800',
};

const statusIcons = {
  Pendente: <Clock className="w-4 h-4" />,
  Aceita: <BadgeCheck className="w-4 h-4" />,
  Recusada: <XCircle className="w-4 h-4" />,
};

export function PaginaPropostas() {
  const [abaSelecionada, setAbaSelecionada] = useState('realizadas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProposal, setModalProposal] = useState(null);
  const { data } = useReceivedProposals();

  const receivedProposals = data || {};

  console.log(receivedProposals);

  const handleCardClick = (proposal) => {
    setModalProposal(proposal);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white">
      <div className="p-8 max-w-screen-xl mx-auto ">
        <div className="text-center justify-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 text-white p-4 rounded-full">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Gerencie suas Propostas de Troca
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Acompanhe todas as suas propostas enviadas e recebidas em um só
            lugar. Aceite, recuse ou negocie suas trocas de forma simples e
            segura.
          </p>
        </div>

        {/* botão de propostas recebidas */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <Button
            variant="outline"
            className={`rounded-xl px-6 flex items-center gap-2 ${
              abaSelecionada === 'recebidas'
                ? 'bg-black text-white'
                : 'bg-white text-black border border-black'
            }`}
            onClick={() => setAbaSelecionada('recebidas')}
          >
            <Inbox className="w-4 h-4" /> Propostas Recebidas
            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
              3
            </span>
          </Button>

          {/* botão propostas realizadas */}
          <Button
            className={`rounded-xl px-6 flex items-center gap-2 ${
              abaSelecionada === 'realizadas'
                ? 'bg-black text-white'
                : 'bg-white text-black border border-black'
            }`}
            onClick={() => setAbaSelecionada('realizadas')}
          >
            <Send className="w-4 h-4" /> Propostas Realizadas
            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
              3
            </span>
          </Button>
        </div>

        <h2 className="text-xl font-bold mb-1">Propostas Realizadas</h2>
        <p className="text-gray-600 mb-4">
          Acompanhe o status das propostas que você enviou
        </p>

        <ProposalList proposals={proposals} onCardClick={handleCardClick} />
      </div>

      <ProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        proposal={modalProposal} // ← esta linha estava faltando!
      />
    </div>
  );
}
