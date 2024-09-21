'use client'

import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { NotificationCountInfo } from "@/lib/types"
import { useQuery } from "@tanstack/react-query";
import {  BellIcon } from "lucide-react";
import Link  from 'next/link'

 interface NotificationsButtonProps {
    initialState: NotificationCountInfo
}

export default function NotificationsButton({ initialState }: NotificationsButtonProps) {
    const {data} = useQuery(
        {
            queryKey:['unread-notification-count'],
            queryFn: () => kyInstance.get('/api/notifications/unread-count')
            .json<NotificationCountInfo>(),
            initialData:initialState,
            refetchInterval: 60 * 1000
        }
    )
    return (
      <Button
        variant={"ghost"}
        className="flex items-center justify-start gap-3"
        title="Notifications"
        asChild
      >
        <Link href={"/notifications"}>
          <div className="relative">
            <BellIcon />
            {!!data.unreadCount && (
                <span className="absolute text-xs -right-2 -top-2 rounded-full bg-primary text-primary-foreground px-1 font-medium tabular-nums">
                    {data.unreadCount}
                </span>
            )}
          </div>
          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </Button>
    );
}