import { createFileRoute } from '@tanstack/react-router';
import { ResetPasswordPage } from '@/features/auth/reset-password-page';

export const Route = createFileRoute('/_auth/password/reset')({
  component: RouteComponent,
});

export function RouteComponent() {
  return <ResetPasswordPage />;
}
