import { BellRingIcon, HandshakeIcon, MessagesSquareIcon } from 'lucide-react';
import { Badge } from './ui/badge';

export default function ItemStatusBadge({ status }) {
  if (status === 'Disponível') {
    return (
      <Badge className="bg-green-800 p-2 font-bold text-green-200">
        <BellRingIcon className="mr-2 fill-green-200" size={16} />
        {status}
      </Badge>
    );
  }
  if (status === 'Trocado') {
    return (
      <Badge className=" bg-amber-500 p-2 font-bold text-amber-100 ">
        <HandshakeIcon className="mr-2 fill-amber-400 " size={16} />
        {status}
      </Badge>
    );
  }
  if (status === 'Em negociação') {
    return (
      <Badge className="bg-yellow-200 p-2 font-bold text-orange-400">
        <MessagesSquareIcon className="mr-2 fill-orange-400" size={16} />
        {status}
      </Badge>
    );
  }
  // if (status === 'Com Defeitos') {
  //   return (
  //     <Badge className="bg-red-800 font-bold text-red-400 hover:bg-red-800">
  //       <CircleIcon className="mr-2 fill-red-500" size={10} />
  //       {status}
  //     </Badge>
  //   );
}
