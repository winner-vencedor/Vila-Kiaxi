'use client';

import Image from 'next/image';
import UserPhoto from '@/assets/ildinha.png';
import { Menu, Bell, LucideSearch } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../SideBarNavigation/hooks/useSidebar';

export default function HeaderDesktop() {
  const pathname = usePathname();
  const { expanded } = useSidebar();
  return (
    <header className={`fixed top-0 right-0 z-40 hidden h-16 items-center border-b border-gray-900 bg-gray-200 dark:bg-gray-600 p-2 px-4 transition-[left] duration-200 md:flex ${expanded ? 'left-36' : 'left-20'}`}>
      <div className="w-full flex items-center justify-between">
        <div className='md:-ml-2 md:mr-1'>
          <h1 className="text-foreground text-sm font-mono">
            {pathname.split(` `).map((word) => {
              return word[0]
                .slice(1)
                .concat(word.substring(1))
                .toLocaleUpperCase();
            })}
          </h1>
        </div>

        <div className="flex gap-3 items-center">
          <div className="relative">
            <LucideSearch
              size={10}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-900"
            />
            <input
              type="text"
              className="rounded-2xl bg-gray-500 outline-none pl-10 px-1 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex gap-2">
            <button className="p-2 text-foreground hover:text-emerald-700">
              <Menu size={18} />
            </button>
            <button className="p-2 text-foreground hover:text-emerald-700">
              <Bell size={18} />
            </button>
          </div>

          <div className="h-7 border border-border" />

          <div className="flex gap-2 items-center">
            <Image
              src={UserPhoto}
              alt=""
              loading="eager"
              className="w-9 h-9 rounded-full"
              priority
            />

            <div className="flex flex-col ">
              <h4 className="text-sm font-medium text-foreground">Ilda Nhanga</h4>
              <span className="text-sm font-medium text-muted-foreground">
                Tues,21November2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
