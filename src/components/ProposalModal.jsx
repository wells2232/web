import { User, MoveRight } from 'lucide-react'
export function ProposalModal({ proposal, isOpen, onClose }) {
  if (!isOpen || !proposal) return null;

  const formatarData = (data) => {
    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6">
        
        {/* Header */}
        <div className="flex flex-col justify-between items-start border-b pb-4">
          <div>
            <h2 className="text-xl font-semibold">Detalhes da Proposta</h2>
            <div className="text-sm text-gray-500">
            {formatarData(proposal.dataEnvio)}
          </div>
            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded-full mt-2">
              ⏳ {proposal.status}
            </span>
          </div>
        </div>

        {/* Usuários */}
        <div className="flex flew-row justify-center justify-around gap-10  mt-4 mb-4">
          <div className="bg-gray-100 rounded-lg min-w-40 flex flex-col align-middle justify-center pl-5 ">
            <div className="text-lg text-gray-500 font-medium"><User /></div>
            <p className="font-semibold text-gray-800">{proposal.remetente.nome}</p>
          </div>
          <div>
            <MoveRight size={100} color={'gray'}/>
          </div>
          <div className="bg-gray-100 rounded-lg min-w-40 flex flex-col align-middle justify-center pl-5 ">
            <div className="text-sm text-gray-500 font-normal "><User /> </div>
            <p className="font-semibold text-gray-800">{proposal.destinatario.nome}</p>
          </div>
        </div>

        {/* Itens da troca */}
        <div className="bg-blue-50 p-5 rounded-xl mb-6">
          <h3 className="font-medium text-gray-700 mb-4">Itens da Troca</h3>
          <div className="grid grid-cols-3 items-center gap-4">
            
            {/* Item Oferecido */}
            <div className="bg-white rounded-lg p-4 shadow">
              <img src={proposal.itemOferecido.imagem} alt="Item oferecido" className="w-full h-32 object-cover rounded mb-3" />
              <h4 className="font-semibold">{proposal.itemOferecido.nome}</h4>
              <p className="text-sm text-gray-600 mb-2">{proposal.itemOferecido.descricao}</p>
              <div className="flex gap-2 text-xs">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{proposal.itemOferecido.categoria}</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{proposal.itemOferecido.condicao}</span>
              </div>
            </div>

            {/* Seta */}
            <div className="text-center text-3xl text-gray-400">➡️</div>

            {/* Item Desejado */}
            <div className="bg-white rounded-lg p-4 shadow">
              <img src={proposal.itemDesejado.imagem} alt="Item desejado" className="w-full h-32 object-cover rounded mb-3" />
              <h4 className="font-semibold">{proposal.itemDesejado.nome}</h4>
              <p className="text-sm text-gray-600 mb-2">{proposal.itemDesejado.descricao}</p>
              <div className="flex gap-2 text-xs">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{proposal.itemDesejado.categoria}</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{proposal.itemDesejado.condicao}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Mensagem */}
        <div className="border rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-700 mb-2"><bold>Mensagem</bold> </h3>
          <p className="text-sm text-gray-600">{proposal.mensagem}</p>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition"
          >
            Recusar Proposta
          </button>
          <button
            onClick={() => alert("Aceitou a proposta!")}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
          >
            Aceitar Proposta
          </button>
        </div>
      </div>
    </div>
  );
}