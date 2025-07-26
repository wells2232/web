import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, Inbox, Send } from 'lucide-react';
import { useState } from 'react';
import { ProposalList } from '@/components/ProposalList';
import { ProposalModal } from '@/components/ProposalModal';
import { Button } from '@/components/ui/button';
import {
  useProposals,
  useReceivedProposals,
} from '@/features/proposal/hooks/use-proposals';

export const Route = createFileRoute('/_app/proposals')({
  component: ProposalPage,
});

export function ProposalPage() {
  const [abaSelecionada, setAbaSelecionada] = useState('realizadas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProposal, setModalProposal] = useState(null);
  const { data: receivedProposals } = useReceivedProposals();
  const { data: sentProposals } = useProposals();

  console.log('Received Proposals:', receivedProposals);
  console.log('Sent Proposals:', sentProposals);

  const proposals =
    abaSelecionada === 'recebidas'
      ? receivedProposals || []
      : sentProposals || [];

  const handleCardClick = (proposal) => {
    setModalProposal(proposal);
    setIsModalOpen(true);
  };

  console.log('Proposals:', proposals);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl p-8 ">
        <div className="mb-8 justify-center text-center items-center">
          <div className="mb-4 flex justify-center items-center">
            <div className="rounded-full bg-blue-500 p-4 text-white">
              <ArrowRight className="h-6 w-6" />
            </div>
          </div>
          <h1 className="mb-2 font-bold text-3xl">
            Gerencie suas Propostas de Troca
          </h1>
          <p className="mx-auto max-w-xl text-gray-600">
            Acompanhe todas as suas propostas enviadas e recebidas em um só
            lugar. Aceite, recuse ou negocie suas trocas de forma simples e
            segura.
          </p>
        </div>

        {/* botão de propostas recebidas */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <Button
            className={`flex items-center gap-2 rounded-xl px-6 ${
              abaSelecionada === 'recebidas'
                ? 'bg-black text-white'
                : 'border border-black bg-white text-black'
            }`}
            onClick={() => setAbaSelecionada('recebidas')}
            variant="outline"
          >
            <Inbox className="h-4 w-4" /> Propostas Recebidas
            <span className="rounded-full bg-blue-100 px-2 py-0.5 font-bold text-blue-600 text-xs">
              {receivedProposals?.totalItems || 0}
            </span>
          </Button>

          {/* botão propostas realizadas */}
          <Button
            className={`flex items-center gap-2 rounded-xl px-6 ${
              abaSelecionada === 'realizadas'
                ? 'bg-black text-white'
                : 'border border-black bg-white text-black'
            }`}
            onClick={() => setAbaSelecionada('realizadas')}
          >
            <Send className="h-4 w-4" /> Propostas Realizadas
            <span className="rounded-full bg-blue-100 px-2 py-0.5 font-bold text-blue-600 text-xs">
              {sentProposals?.totalItems || 0}
            </span>
          </Button>
        </div>

        <div className="items-center">
          {abaSelecionada === 'realizadas' ? (
            <>
              <h2 className="mb-1 font-bold text-xl">Propostas Realizadas</h2>
              <p className="mb-4 text-gray-600">
                Acompanhe o status das propostas que você enviou
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-1 font-bold text-xl">Propostas Recebidas</h2>
              <p className="mb-4 text-gray-600">
                Veja as propostas que você recebeu e escolha se quer aceitar ou
                recusar
              </p>
              <ProposalList
                onCardClick={handleCardClick}
                proposals={proposals}
              />
            </>
          )}

          <ProposalList onCardClick={handleCardClick} proposals={proposals} />
        </div>
      </div>

      <ProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
        }}
        proposal={modalProposal}
      />
    </div>
  );
}
