import { Plus } from "lucide-react";

export default function CallToAction() {
  return (

<div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-3xl p-10 shadow-inner border border-gray-200 text-center w-full max-w-5xl mx-auto my-10">
      {/* Ícone de + no topo */}
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-4 shadow-lg">
          <Plus className="text-white w-6 h-6" />
        </div>
      </div>

      {/* Título e texto */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        Não encontrou o que procura?
      </h2>
      <p className="text-gray-700 text-lg">
        Cadastre seu item e faça parte da nossa comunidade de trocas sustentáveis.
      </p>
      <p className="text-gray-700 text-lg">
        Transforme o que não usa mais em algo que pode fazer a diferença para alguém.
      </p>

      {/* Botão */}
      <div className="mt-6 flex justify-center">
        <button className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 flex items-center gap-2 bg-gradient-to-br from-orange-500 to-orange-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:brightness-110 transition-all duration-300">
          <Plus className="w-5 h-5" />
          Cadastrar Item
        </button>
      </div>
    </div>
  );
}