import { Outlet } from 'react-router-dom';
import { NavBar } from './navbar';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-900">
      <NavBar />

      <main className="w-full flex-grow bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
        <div className="mx-auto w-full px-4 sm:px-6 md:max-w-[1204px]">
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
