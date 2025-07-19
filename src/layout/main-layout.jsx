import { Outlet } from 'react-router-dom';
import { NavBar } from './navbar';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <NavBar />

      <main className="w-full flex-grow">
        <div className="mx-auto w-full max-w-[1204px] px-4 sm:px-6">
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
