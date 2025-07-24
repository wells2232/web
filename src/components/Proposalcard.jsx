
import { Calendar , Clock} from 'lucide-react';

export function ExchangeProposalCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-xl w-full border border-gray-200">
      {/* Status e Data */}
      <div className="flex justify-between items-center mb-4">
        <span className="flex items-center gap-2 text-yellow-700 bg-yellow-100 px-3 py-1 text-sm font-semibold rounded-full">
          <Clock className="text-yellow-600" />
          Pendente
        </span>
        <div className="flex items-center text-gray-500 text-sm gap-2">
          <Calendar  />
          <span>16/01/2024</span>
        </div>
      </div>

      {/* Nome e tipo da proposta */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Ana Silva"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800">Ana Silva</p>
          <p className="text-gray-500 text-sm">Proposta de troca</p>
        </div>
      </div>

      {/* Itens da troca */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-4">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.pixabay.com/photo/2014/08/05/10/31/camera-410124_1280.jpg"
            alt="Câmera Canon DSLR"
            className="w-16 h-16 rounded object-cover border"
          />
          <div>
            <p className="font-semibold">Câmera Canon DSLR</p>
            <p className="text-sm text-gray-500">Excelente</p>
          </div>
        </div>

        <span className="text-2xl text-gray-400">→</span>

        <div className="flex items-center gap-3">
          <img
            src="https://cdn.pixabay.com/photo/2020/08/13/01/29/iphone-12-5485710_1280.jpg"
            alt="iPhone 12 Pro"
            className="w-16 h-16 rounded object-cover border"
          />
          <div>
            <p className="font-semibold">iPhone 12 Pro</p>
            <p className="text-sm text-gray-500">Excelente</p>
          </div>
        </div>
      </div>

      {/* Mensagem */}
      <div className="bg-gray-100 p-4 rounded-lg text-gray-700 text-sm mb-4">
        Oi! Vi que você tem um iPhone 12 Pro. Tenho uma câmera Canon DSLR
        profissional que pode te interessar. Ela está...
      </div>

      {/* Ações */}
      <div className="flex justify-between gap-4">
        <button className="w-full border border-red-500 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-50 transition">
          Recusar
        </button>
        <button className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition">
          Aceitar
        </button>
      </div>
    </div>
  );
}
