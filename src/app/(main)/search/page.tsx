import TrendsSidebar from "@/components/trends-sidebar";
import { Metadata } from "next";
import SearchResults from "./search-results";

interface PageProps {
  searchParams: { q: string };
}

export function generateMetadata({ searchParams: { q } }: PageProps): Metadata {
  return {
    title: `Search results for "${q}"`,
  };
}

export default function Page({ searchParams: { q } }: PageProps) {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 font-bold">
          <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
            {" "}
            {`Search results for "${q}"`}
          </h1>
        </div>
        <SearchResults query={q} />
      </div>
      <TrendsSidebar />
    </main>
  );
}