import { Home, CalendarPlus, Bookmark, UserRound ,MessageSquare,SettingsIcon,Gamepad2,LucideUsers2} from 'lucide-react';

export const SideBarItems = [
  { id: 'inicio', label: 'Home', icon: Home, href: '/home' },
  {
    id: 'agendar',
    label: 'Agendar',
    icon: CalendarPlus,
    href: '/appointments',
  },
  { id: 'historico',
     label: 'Histórico',
      icon: Bookmark,
      href: '/match-history'
    },
  { id: 'perfil',
     label: 'Perfil',
      icon: UserRound,
       href: '/profile'
     },
     {
        id:"chat",
        label:"Chat",
        icon:MessageSquare,
        href:"/messages"
     }
     ,
     {
      id:"plantel",
      label:"Plantel",
      icon:LucideUsers2,
      href:"/squad"
     },
     {
        id:"games",
        label:"Games",
        icon:Gamepad2,
        href:"/matches"
     },
     {
        id:"settings",
        label:"Settings",
        icon:SettingsIcon,
        href:"/settings"
     }
];
