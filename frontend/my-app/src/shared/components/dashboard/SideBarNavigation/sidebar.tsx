'use client';


import SideBarMenu from "./SideBarMenu"
import SideBarFooter from "./SideBarFooter"
import SideBarHeader from "./SideBarHeader";
import { useSidebar } from './hooks/useSidebar';

export default function Sidebar() {
  const { expanded } = useSidebar();

  return (
    <aside className={`fixed left-0 top-0 z-50 hidden h-screen overflow-hidden transition-[width] duration-200 md:block ${expanded ? 'w-36' : 'w-20'}`}>
      <nav className="h-full flex flex-col bg-gray-200 dark:bg-gray-600 text-sidebar-foreground border-r border-sidebar-border shadow-sm">
    <SideBarHeader/>
    <div className="flex-1 overflow-y-auto">
      <SideBarMenu/>
      </div>
      <SideBarFooter/>

      </nav>
    </aside>
  );
}
