"use client";
import { useSession } from "@/app/(main)/session-provider";
import UserAvatar from "@/components/user-avatar";
import { PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import PostMoreButton from "./post-more-button";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { username, avatarUrl, displayName, id } = post.user;
  const { user } = useSession();
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${username}`}>
            <UserAvatar avatarUrl={avatarUrl} />
          </Link>
          <div className="">
            <Link
              href={`/users/${username}`}
              className="block font-medium hover:underline"
            >
              {displayName}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>

      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
}
