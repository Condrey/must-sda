import TrendsSidebar from "@/components/trends-sidebar";
import { Metadata } from "next";
import   Notifications from "./notifications";
 "./notifications";
export const metadata: Metadata = {
  title: "Notifications",
};
export default function Page() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 font-bold">Notifications</div>
        <Notifications />
      </div>
      <TrendsSidebar />
    </main>
  );
}
