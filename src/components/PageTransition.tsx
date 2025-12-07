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
      className="fade-in mr-3 ml-40 my-22 3xl:px-28 3xl:py-12 4xl:px-48 4xl:py-14"
    >
      {children}
    </div>
  );
}
