import Profile from '@/features/settings/components/settings';

export default function Settings() {
  return (
    <div className="bg-gray-200 h-full">

      <header className=" flex items-center justify-center bg-gray-50 h-20 md:hidden">
        <h2 className="text-xl font-mono">Profile</h2>
      </header>

      <div className="p-3">
        <Profile />
      </div>

    </div>
  );
}
