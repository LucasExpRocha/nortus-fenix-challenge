'use client';

import { usePathname } from 'next/navigation';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div
      key={pathname}
      className="fade-in mr-3 ml-40 my-22 3xl:px-28 3xl:pt-6 4xl:px-48 4xl:pt-14"
    >
      {children}
    </div>
  );
}
