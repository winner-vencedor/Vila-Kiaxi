import { useLogout } from '@/features/auth/hooks/useLogout';
import { useSidebar } from './hooks/useSidebar';
import { LogOut } from 'lucide-react';

export default function SideBarFooter() {
  const { expanded } = useSidebar();
  const { logout } = useLogout();
  return (
    <footer className="p-3">
      <div
        className={`flex items-center transition-all duration-200 px-4 py-1.5 mt-3 cursor-pointer `}
      >
        <button
          onClick={logout}
          className="flex gap-2 items-center text-sidebar-foreground cursor-pointer hover:text-emerald-700"
        >
          <LogOut size={20} strokeWidth={`${expanded ? 2.2 : 1.8}`} />
          <p
            className={`transition-all overflow-hidden font-mono text-sm ${expanded ? 'w-auto opacity-100 ml-0' : 'w-0 opacity-0 ml-0'}`}
          >
            Log Out
          </p>
        </button>
      </div>
    </footer>
  );
}
