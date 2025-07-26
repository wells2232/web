/** biome-ignore-all lint/style/useFilenamingConvention: <explanation> */
import {
  BadgeCheck,
  Calendar,
  Clock,
  Target,
  XCircle,
  UserRound,
} from 'lucide-react';

const statusStyles = {
  Pendente: 'text-yellow-700 bg-yellow-100',
  Aceita: 'text-green-700 bg-green-100',
  Recusada: 'text-red-700 bg-red-100',
};

const statusIcons = {
  Pendente: <Clock className="text-yellow-600" />,
  Aceita: <BadgeCheck className="text-green-600" />,
  Recusada: <XCircle className="text-red-600" />,
};

export function ProposalCard({ proposal, onClick }) {
  // const [isOpen, setIsOpen] = useState(false);
  if (!proposal) {
    return null;
  }

  console.log('ProposalCard:', proposal);

  return (
    <div className="items-center justify-center">
      <div
        className="w-80 mx-auto rounded-xl border border-gray-200 bg-white p-6 shadow-md"
        onClick={() => onClick(proposal)}
      >
        {/* Status e Data */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`flex items-center gap-2 rounded-full px-3 py-1 font-semibold text-sm ${statusStyles[proposal.status]}`}
          >
            {statusIcons[proposal.status]}
            {proposal.status}
          </span>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar />
            <span>
              {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
        {/* Nome e tipo da proposta */}
        <div className="mb-4 mt-4 flex items-center gap-3">
          <UserRound />
          <div>
            <p className="font-semibold text-gray-800">
              Proposta enviada para:
            </p>
            <p className="text-gray-500 text-sm">
              {proposal.targetItem.user.name}
            </p>
          </div>
        </div>

        {/* Itens da troca */}
        <div className="mb-4 rounded-xl bg-gray-50 p-4 min-h-[270px] max-h-[250px] overflow-y-auto">
          <h4 className="font-bold font-xl mb-3">Item Oferecido:</h4>
          <div className="flex flex-row flex-wrap justify-start">
            {proposal.offeredItems.map((item) => (
              <div className="flex items-center mb-2 gap-3" key={item.id}>
                <picture className="">
                  <img
                    alt={item.itemName}
                    className="h-16 w-16 rounded border object-cover"
                    src={item.imageUrl}
                  />
                </picture>

                <div>
                  <p className="text-wrap font-semibold">{item.itemName}</p>
                  <p className="text-gray-500 text-sm">{item.condition.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-row flex-wrap">
            <h4 className="font-bold font-xl mb-3 mt-4">Item Requisitado:</h4>
            <div className="flex flex-row  items-center gap-3">
              <picture>
                <img
                  alt={proposal.targetItem.itemName}
                  className="h-16 w-16 rounded border object-cover"
                  src={proposal.targetItem.imageUrl}
                />
              </picture>

              <div>
                <p className="font-semibold">{proposal.targetItem.itemName}</p>
                <p className="text-gray-500 text-sm">
                  {proposal.targetItem.condition}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 max-h-15 overflow-hidden text-ellipsis rounded-lg bg-gray-100 p-4">
          <p className="line-clamp-3 text-gray-700 text-sm">
            {proposal.message}
          </p>
        </div>
      </div>
    </div>
  );
}
