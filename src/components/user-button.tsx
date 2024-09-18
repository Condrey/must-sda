"use client";

import { logout } from "@/app/(auth)/logout/actions";
import { useSession } from "@/app/(main)/session-provider";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import {
  CheckIcon,
  LogOutIcon,
  Monitor,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";

interface UserButtonProps {
  className?: string;
}
export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{`Logged in as @${user.username}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/users/${user.username}`}>
            <UserIcon className="mr-2 size-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <MonitorIcon className="mr-2 size-4" />
                System default
                {theme === "system" && <CheckIcon className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <SunIcon className="mr-2 size-4" />
                Light
                {theme === "light" && <CheckIcon className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <MoonIcon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <CheckIcon className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            queryClient.clear();
            logout();
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
