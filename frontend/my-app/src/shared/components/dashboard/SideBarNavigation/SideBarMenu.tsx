import { cn } from '@/lib/utils';
import { SideBarItems } from './sideBarItems';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebar } from './hooks/useSidebar';

export default function SideBarMenu() {
  const pathname = usePathname();
  const {expanded} = useSidebar();
  const router = useRouter();
  const activeTab =
    SideBarItems.find((item) => item.href === pathname)?.id || pathname;

  return (
    <nav className="flex-1 px-3">
      {SideBarItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => router.push(item.href)}
            className={cn(
              'flex items-center rounded-sm transition-all duration-200 px-4 py-1.5 mt-3 cursor-pointer',
                  isActive ? 'font-bold bg-emerald-100 dark:bg-sidebar-accent' : 'bg-transparent px-2'
            )}
          >
            <div className="flex items-center gap-3 ">
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.8}
                className={cn(
                  ' transition-all overflow-hidden duration-200 font-semibold ',
                  isActive ? 'text-emerald-700 dark:text-sidebar-primary' : 'text-gray-900 dark:text-sidebar-foreground'
                )}
              />
              <span
                className={cn(
                  'text-xs font-mono leading-tight transition-all overflow-hidden duration-200 whitespace-nowrap',
                  isActive ? 'text-emerald-700 dark:text-sidebar-primary' : 'font-normal text-gray-900 dark:text-sidebar-foreground',
                  expanded ? 'w-auto opacity-100 ml-0' : 'w-0 opacity-0 ml-0'
                )}
              >
                {item.label}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
