'use client';

import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ButtomnavItems } from './bottomNavItems';

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab =
    ButtomnavItems.find((item) => item.href === pathname)?.id || 'inicio';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t-2 bg-zinc- border-gray- backdrop-blur-sm md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav className="flex items-center justify-around  max-w-md mx-auto p-3">
        {ButtomnavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 focus:outline-none select-none active:opacity-70 transition-opacity"
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-full transition-all duration-200 px-4 py-1.25',
                  isActive ? 'font-bold' : 'bg-transparent px-2'
                )}
              >
                <Icon
                  size={25}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={cn(
                    'transition-colors duration-200 font-semibold',
                    isActive ? 'text-gray-700' : 'text-gray-400'
                  )}
                />
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
