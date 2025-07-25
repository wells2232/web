import { createFileRoute } from '@tanstack/react-router';
import { ItemDetailPage } from '@/components/itemPage';

export const Route = createFileRoute('/_app/items/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ItemDetailPage />;
}
