/** biome-ignore-all lint/style/useFilenamingConvention: <explanation> */
import { Calendar, Clock, BadgeCheck, XCircle } from 'lucide-react';
import { useState } from 'react';

const statusStyles = {
  Pendente: "text-yellow-700 bg-yellow-100",
  Aceita: "text-green-700 bg-green-100",
  Recusada: "text-red-700 bg-red-100",
};

const statusIcons = {
  Pendente: <Clock className="text-yellow-600" />,
  Aceita: <BadgeCheck className="text-green-600" />,
  Recusada: <XCircle className="text-red-600" />,
};

export function ExchangeProposalCard({ proposal, onClick }) {
  // const [isOpen, setIsOpen] = useState(false);
  if (!proposal) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 min-w-80 w-full  border border-gray-200"
    onClick={() => onClick(proposal)}
    >
      {/* Status e Data */}
      <div className="mb-4 flex items-center justify-between">
        <span className={`flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[proposal.status]}`}>
          {statusIcons[proposal.status]}
          {proposal.status}
        </span>
        <div className="flex items-center text-gray-500 text-sm gap-2">
          <Calendar />
          <span>{proposal.data}</span>
        </div>
      </div>

      {/* Nome e tipo da proposta */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Usuário"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800">Proposta enviada</p>
          <p className="text-gray-500 text-sm">Proposta de troca</p>
        </div>
      </div>

      {/* Itens da troca */}
      <div className="flex flew-row justify-between overflow-hidden items-center bg-gray-50 p-4 rounded-xl mb-4">
        <div className='flex flex-row justify-start flex-wrap'>
        <div className="flex items-center gap-3">
          <img
            src={proposal.itemOferecido.imagem}
            alt={proposal.itemOferecido.nome}
            className="w-16 h-16 rounded object-cover border"
          />
          <div>
            <p className="font-semibold text-wrap">{proposal.itemOferecido.nome}</p>
            <p className="text-sm text-gray-500">{proposal.itemOferecido.condicao}</p>
          </div>
        </div>
        </div>

        <span className="text-2xl text-gray-400">→</span>

        <div className='flex flex-row flex-wrap'>
        <div className="flex items-center gap-3">
          <img
            src={proposal.itemDesejado.imagem}
            alt={proposal.itemDesejado.nome}
            className="w-16 h-16 rounded object-cover border"
          />
          <div>
            <p className="font-semibold">{proposal.itemDesejado.nome}</p>
            <p className="text-sm text-gray-500">{proposal.itemDesejado.condicao}</p>
          </div>
        </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 max-h-15 overflow-hidden text-ellipsis rounded-lg mb-4">
        <p className='text-gray-700 text-sm line-clamp-3'>
        {proposal.mensagem}
        </p>
      </div>

      
    </div>
  );
}
