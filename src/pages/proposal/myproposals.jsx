import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Clock, XCircle, ArrowRight, Inbox, Send } from "lucide-react";
import { ExchangeProposalCard } from "@/components/Proposalcard";

const propostas = [
  {
    id: 1,
    status: "Pendente",
    data: "15/01/2024",
    itemOferecido: {
      nome: "iPhone 12 Pro",
      condicao: "Excelente",
      imagem: "https://via.placeholder.com/50",
    },
    itemDesejado: {
      nome: "Bicicleta Mountain Bike",
      condicao: "Bom",
      imagem: "https://via.placeholder.com/50",
    },
    mensagem: "Olá! Tenho muito interesse na sua bicicleta. Meu iPhone está em perfeito estado, com todos os...",
  },
  {
    id: 2,
    status: "Aceita",
    data: "12/01/2024",
    itemOferecido: {
      nome: "MacBook Air M1",
      condicao: "Muito Bom",
      imagem: "https://via.placeholder.com/50",
    },
    itemDesejado: {
      nome: "Nintendo Switch",
      condicao: "Muito Bom",
      imagem: "https://via.placeholder.com/50",
    },
    mensagem: "Gostaria de trocar meu MacBook pelo seu Nintendo Switch. Está interessado?",
  },
  {
    id: 3,
    status: "Recusada",
    data: "10/01/2024",
    itemOferecido: {
      nome: "Guitarra Elétrica",
      condicao: "Bom",
      imagem: "https://via.placeholder.com/50",
    },
    itemDesejado: {
      nome: "Qualquer item",
      condicao: "",
      imagem: "https://via.placeholder.com/50",
    },
    mensagem: "Tenho uma guitarra em bom estado. Está disposta a trocar por algum item seu?",
  },
];

const statusStyles = {
  Pendente: "bg-yellow-100 text-yellow-800",
  Aceita: "bg-green-100 text-green-800",
  Recusada: "bg-red-100 text-red-800",
};

const statusIcons = {
  Pendente: <Clock className="w-4 h-4" />,
  Aceita: <BadgeCheck className="w-4 h-4" />,
  Recusada: <XCircle className="w-4 h-4" />,
};

export function PaginaPropostas() {
  const [abaSelecionada, setAbaSelecionada] = useState("realizadas");

  return (
    <div className="bg-white">
    <div className="p-8 max-w-screen-xl mx-auto ">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500 text-white p-4 rounded-full">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Gerencie suas Propostas de Troca</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Acompanhe todas as suas propostas enviadas e recebidas em um só lugar. Aceite, recuse ou negocie suas trocas de forma simples e segura.
        </p>
      </div>

      <div className="flex gap-4 justify-center mb-6">
        <Button
          variant="outline"
          className={`rounded-xl px-6 flex items-center gap-2 ${
            abaSelecionada === "recebidas" && "ring-2 ring-blue-500"
          }`}
          onClick={() => setAbaSelecionada("recebidas")}
        >
          <Inbox className="w-4 h-4" /> Propostas Recebidas
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
        </Button>
        <Button
          className="rounded-xl px-6 flex items-center gap-2"
          onClick={() => setAbaSelecionada("realizadas")}
        >
          <Send className="w-4 h-4" /> Propostas Realizadas
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
        </Button>
      </div>

      <h2 className="text-xl font-bold mb-1">Propostas Realizadas</h2>
      <p className="text-gray-600 mb-4">Acompanhe o status das propostas que você enviou</p>
      <ExchangeProposalCard />
      <ExchangeProposalCard />
      <ExchangeProposalCard />
      

     
    </div>
    </div>
  );
}
