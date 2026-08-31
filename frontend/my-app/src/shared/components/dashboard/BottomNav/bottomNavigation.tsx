'use client';

import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ButtomnavItems } from './bottomNavItems';


export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab =
    ButtomnavItems.find((item) => item.href === pathname)?.id || pathname;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-zinc-100 border-gray-600 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav className="flex items-center justify-around  max-w-md mx-auto p-2">
        {ButtomnavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className="group flex flex-col items-center justify-center gap-0.5 py-1 px-2 focus:outline-none select-none active:opacity-70 transition-opacity"
            >
              <div
                className={cn(
                  'flex flex-col gap-1 items-center justify-center rounded-full transition-all duration-200 px-4 py-1.25',
                  isActive ? 'font-medium' : 'bg-transparent px-2'
                )}
              >
                <Icon
                  size={25}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={cn(
                    'transition-colors duration-200 font-semibold',
                    isActive ? 'text-emerald-700' : 'text-gray-900 hover:text-emerald-700 group-hover:text-emerald-700'
                  )}
                />
                <span className={cn(
                  `text-sm font-100 transition-colors duration-200 hidden `,isActive ? `text-emerald-700` :`text-gray-400 hover:text-emerald-700 group-hover:text-emerald-700`
                )}>
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
