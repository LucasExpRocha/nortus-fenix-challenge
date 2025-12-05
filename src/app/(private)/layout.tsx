import SidebarNav from '@/components/SidebarNav';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-[#0B1125] text-white flex gap-6">
      <SidebarNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
