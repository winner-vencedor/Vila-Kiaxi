import {
  Home,
  CalendarPlus,
  Bookmark,
  UserRound,
  MessageSquare,
} from 'lucide-react';

export const ButtomnavItems = [
  { id: 'inicio', label: 'Home', icon: Home, href: '/home' },
  {
    id: 'agendar',
    label: 'Agendar',
    icon: CalendarPlus,
    href: '/appointments',
  },
  {
    id: 'historico',
    label: 'Histórico',
    icon: Bookmark,
    href: '/match-history',
  },

  {
    id: 'chat',
    label: 'Chat',
    icon: MessageSquare,
    href: '/messages',
  },
  { id: 'perfil', label: 'Perfil', icon: UserRound, href: '/profile' },
];
