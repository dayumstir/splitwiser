import { BottomNav } from "~/components/bottom-nav";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BottomNav />
      {children}
    </>
  );
}
