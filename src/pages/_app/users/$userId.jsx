import { createFileRoute } from '@tanstack/react-router';
import { UserProfileCopy } from '@/components/UserProfileCopy';

export const Route = createFileRoute('/_app/users/$userId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserProfileCopy />;
}
