import { BadgeInfo } from 'lucide-react';
export default function ItemCard({ item_name, description, condition, image_url, onClick}) {

  const iconColorClass =
    condition === 'Novo'
      ? 'text-green-600 '
      : condition === 'Seminovo'
      ? 'text-yellow-500'
      : 'text-gray-600';

  const badgeClass =
    condition === 'Novo'
      ? 'bg-green-300 text-green-700'
      : condition === 'Seminovo'
      ? 'bg-yellow-300 text-yellow-500'
      : 'bg-gray-700 text-gray-700';


  return (
    
    <div className="bg-white min-w-60 max-w-100 flex flex-col min-h-100 rounded-2xl shadow-md p-4 border border-gray-200 relative">
    <div className=" aspect-square  overflow-hidden rounded-t-xl ">
      <img src={image_url} alt={item_name} className=" w-full h-60 object-cover" />
      <h2 className="text-black text-2xl font-bold mt-2">{item_name}</h2>
      <p className="text-gray-600 text-wrap mt-2">{description}</p>
      
      
          <span
          className={'border border-gray-300 absolute bg-white  top-8 left-7 min-w-20 max-h-10 text-[2] px-2 py-1 rounded-lg flex justify-center items-center gap-1 text-sm'}  
        >
          <BadgeInfo className={iconColorClass} size={16}/>
          <div className={iconColorClass}>{condition}</div>
        </span>
      

        <button
          onClick={onClick}
          className="mt-5 fixed bottom-4 right-4 px-4 py-2 text-white bg-orange-300 hover:bg-orange-500 rounded-lg transition"
        >
          Veja Mais
        </button>
        
      </div>
    </div>
  );
}
