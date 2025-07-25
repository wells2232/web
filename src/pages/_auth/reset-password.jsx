import { createFileRoute } from '@tanstack/react-router';
import { RequestResetPasswordPage } from '@/features/auth/request-reset-password';

export const Route = createFileRoute('/_auth/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return <RequestResetPasswordPage />;
}
