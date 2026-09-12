'use client';

import Image from 'next/image';
import UserPhoto from '@/assets/ildinha.png';
import { AlignLeftIcon, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { SideBarItems } from '@/shared/components/dashboard/SideBarNavigation/sideBarItems';

export default function HeaderMobile() {
  return (
    <header className="bg-background h-20 fixed left-0 right-0 top-0 z-40 flex items-center justify-between rounded-b-sm border-b border-border p-3 backdrop-blur md:hidden">
      <div className="flex min-w-0 items-center gap-3">
        <Image
          src={UserPhoto}
          alt="Foto de Ilda Nhanga"
          loading="eager"
          className="size-13 rounded-full object-cover ring-2 ring-primary/20"
          priority
        />

        <div className="min-w-0">
          <h4 className="truncate text-base font-semibold text-foreground">
            Ilda Nhanga
          </h4>
          <span className="text-xs text-muted-foreground">
            Terça-feira, 21 de novembro
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          aria-label="Ver notificações"
          className="size-10 rounded-full bg-transparent p-2 text-foreground hover:bg-muted hover:text-primary"
        >
          <Bell className="size-5" />
        </Button>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-muted hover:text-primary"
              />
            }
          >
            <AlignLeftIcon className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-60 bg-background flex flex-col justify-between">
            <div>
            <SheetTitle className="text-foreground font-mono  p-2">
              Vila-Kiaxi
            </SheetTitle>
            <nav className="flex flex-col  gap-3 p-4">
              {SideBarItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 text-sm font-mono text-foreground hover:bg-muted rounded-xl p-2"
                >
                  <item.icon className="w-5 h-5 text-emerald-600" />
                  {item.label}
                </Link>
              ))}
            </nav>
            </div>

        <div className='p-3'>
          <Button
                    className="flex gap-2 items-center text-sidebar-foreground cursor-pointer bg-primary p-2 rounded-xl hover:text-background dark:text-background"
                    >
                    <LogOut
                     size={20}

                     />
                    <p className={`transition-all overflow-hidden font-mono text-sm`}>Log Out</p>
                    </Button>
        </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
