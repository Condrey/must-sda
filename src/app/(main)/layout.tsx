import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./session-provider";
import Navbar from "./navbar";
import MenuBar from "./menu-bar";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session =  await validateRequest();

  if (!session.user) redirect("/login");
  return (
    <SessionProvider value={session}>
      <div className="flex min-h-dvh flex-col">
        <Navbar />
        <div className="max-w-7xl mx-auto p-5 flex w-full grow gap-5">
          <MenuBar className="sticky top-[5.25rem] h-fit hidden sm:block flex-none space-y-3 rounded-2xl px-3 py-5  lg:px-5 shadow-sm xl:max-w-sm bg-card"/>
          {children}</div>
          <MenuBar className="sticky bottom-0 flex w-full justify-evenly border-t bg-card  gap-5 sm:hidden p-3"/>
      </div>
    </SessionProvider>
  );
}
