import Image from 'next/image';
import { ChevronRight,ChevronLeft } from 'lucide-react';
import { useSidebar } from './hooks/useSidebar';
import Logo from '@/assets/Soccer-bro.svg';

export default function SideBarHeader() {
  const { expanded, setexpanded } = useSidebar();
  return (
    <header className="p-4 pb-2 flex gap-2 justify-between items-center border-border">
      <Image
        src={Logo}
        alt=""
        className={`w-10 transition-all overflow-hidden ${expanded ? '' : 'w-0'}`}
        priority
      />

      <button
        onClick={() => setexpanded((curr) => !curr)}
        className="p-1 text-sidebar-foreground hover:text-sidebar-primary"
      >
        {expanded ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </header>
  );
}
