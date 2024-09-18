import SearchField from "@/components/search-field";
import UserButton from "@/components/user-button";
import { webName } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href={"/"} className=" hidden sm:block text-2xl font-bold lowercase text-primary">
          {webName}
        </Link>
        <SearchField/>
        <UserButton  className="ml-auto"/>
      </div>
    </header>
  );
}
