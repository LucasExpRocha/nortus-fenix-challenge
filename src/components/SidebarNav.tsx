'use client';

import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Avatar from './ui/Avatar';
import IconButton from './ui/IconButton';
import { createIcon } from './ui/TicketIcon';

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type SidebarNavProps = {
  items?: NavItem[];
  defaultActiveId?: string;
  onSelect?: (id: string) => void;
  initials?: string;
  className?: string;
};

const DashboardIcon = createIcon('/svgs/dashboard.svg', 'Dashboard');
const TicketIcon = createIcon('/svgs/ticket.svg', 'Ticket');
const ChatIcon = createIcon('/svgs/chat.svg', 'Chat');
const ProfileIcon = createIcon('/svgs/profile.svg', 'Profile');
const PlanIcon = createIcon('/svgs/plan.svg', 'Plan');

export default function SidebarNav({
  items = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'ticket', label: 'Ticket', icon: TicketIcon },
    { id: 'chat', label: 'Chat', icon: ChatIcon },
    { id: 'users', label: 'Users', icon: ProfileIcon },
    { id: 'plan', label: 'Plan', icon: PlanIcon },
  ],
  defaultActiveId = 'dashboard',
  onSelect,
  initials = 'AC',
  className,
}: SidebarNavProps) {
  const [active, setActive] = useState(defaultActiveId);

  function handleSelect(id: string) {
    setActive(id);
    onSelect?.(id);
  }

  return (
    <aside
      aria-label="Barra lateral de navegação"
      className={twMerge(
        'flex flex-col justify-between items-center min-w-[82px] h-dvh bg-[#152037] pl-10 pr-11 pt-9 pb-20',
        className
      )}
    >
      <div className="flex flex-col items-center justify-between gap-6 h-full ">
        <div aria-hidden="true" className="flex-center">
          <Image
            src="/svgs/nortusIcon.svg"
            alt="Nortus"
            width={40}
            height={40}
          />
        </div>

        <nav aria-label="Principal">
          <ul className="flex flex-col items-center gap-6">
            {items.map(({ id, label, icon: Icon }) => {
              const isActive = id === active;

              return (
                <li key={id} className="list-none">
                  <IconButton
                    onClick={() => handleSelect(id)}
                    ariaLabel={label}
                    isActive={isActive}
                  >
                    <Icon className="mx-auto text-[22px]" />
                  </IconButton>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pb-2">
          <Avatar initials={initials} />
        </div>
      </div>
    </aside>
  );
}
