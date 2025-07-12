function Card({ nome, descricao, condicao, foto }) {
  return (
    <div className="min-w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-md hover:shadow-laranja ">
      <h2 className="font-bold text-gray-900 text-lg">{nome}</h2>
      <p className="mb-1 text-gray-600 text-sm">{descricao}</p>
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs ${
          condicao === 'Novo'
            ? 'bg-green-100 text-green-700'
            : condicao === 'Seminovo'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-200 text-gray-700'
        }`}
      >
        {condicao}
      </span>
    </div>
  );
}

export default Card;
