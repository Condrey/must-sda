"use client";

import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import PostsLoadingSkeleton from "@/components/posts/posts-loading-skeleton";
import kyInstance from "@/lib/ky";
import { NotificationsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Notification from "./notification";

export default function Notifications() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) =>
      kyInstance(
        "/api/notifications",
        pageParam ? { searchParams: { cursor: pageParam } } : {},
      ).json<NotificationsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const notifications = data?.pages.flatMap((page) => page.notifications) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !notifications.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        {`You don't have any notifications yet`}
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading notifications
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {notifications.map((post) => (
        <Notification key={post.id} notification={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
