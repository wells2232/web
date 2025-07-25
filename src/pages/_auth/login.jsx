import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/features/auth/auth-page';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="">
      <AuthPage isLogin={true} />
    </div>
  );
}
