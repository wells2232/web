import { CircleIcon } from 'lucide-react';
import { Badge } from './ui/badge';

export default function ItemConditionBadge({ condition }) {
  if (condition === 'Novo') {
    return (
      <Badge className=" bg-green-800 font-bold text-green-200">
        <CircleIcon className="mr-2 fill-green-200" size={10} />
        {condition}
      </Badge>
    );
  }
  if (condition === 'Usado - Bom Estado') {
    return (
      <Badge className=" bg-amber-500 font-bold text-amber-100 ">
        <CircleIcon
          className="mr-2 fill-amber-400 dark:fill-amber-200"
          size={10}
        />
        {condition}
      </Badge>
    );
  }
  if (condition === 'Usado - Como Novo') {
    return (
      <Badge className="bg-yellow-200 font-bold text-orange-400 ">
        <CircleIcon className="mr-2 fill-orange-400" size={10} />
        {condition}
      </Badge>
    );
  }
  if (condition === 'Com Defeitos') {
    return (
      <Badge className="bg-red-800 font-bold text-red-400 hover:bg-red-800">
        <CircleIcon className="mr-2 fill-red-500" size={10} />
        {condition}
      </Badge>
    );
  }
}
