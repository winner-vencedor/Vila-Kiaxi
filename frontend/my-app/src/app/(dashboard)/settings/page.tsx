import Profile from '@/features/settings/components/settings';

export default function Settings() {
  return (
    <main className="bg-background flex flex-col gap-2 w-full dark:bg-background min-h-screen ">
      <div className="flex-1 p-3 w-full pt-25 md:pt-3">
        <Profile />
      </div>
    </main>
  );
}
