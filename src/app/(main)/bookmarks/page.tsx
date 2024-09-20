import TrendsSidebar from "@/components/trends-sidebar";
import { Metadata } from "next";
import Bookmarks from "./bookmarks";
export const metadata: Metadata = {
  title: "Bookmarks",
};
export default function Page() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 font-bold">Bookmarks</div>
        <Bookmarks />
      </div>
      <TrendsSidebar />
    </main>
  );
}
