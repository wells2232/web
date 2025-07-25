import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';
import { HomePage } from '@/components/home-page';

export const Route = createFileRoute('/_app/_home/')({
  component: RouteComponent,
  validateSearch: z.object({
    page: z.coerce.number().optional(),
    category: z.string().optional(),
    condition: z.string().optional(),
    search: z.string().optional(),
    orderBy: z.string().optional(),
    orderDirection: z.string().optional(),
  }),
});

function RouteComponent() {
  return <HomePage />;
}
