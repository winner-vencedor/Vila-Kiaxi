import Profile from '@/features/settings/components/settings';

export default function Settings() {
  return (
    <div className="bg-gray-300 dark:bg-zinc-700 min-h-screen">

      <header className=" dark:bg-gray-600 flex items-center justify-center bg-card h-20 md:hidden">
        <h2 className="text-xl font-mono">Profile</h2>
      </header>

      <div className="p-3">
        <Profile />
      </div>

    </div>
  );
}
