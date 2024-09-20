"use client";

import { useSession } from "@/app/(main)/session-provider";
import UserAvatar from "@/components/user-avatar";
import { PostData } from "@/lib/types";
import { cn, formatRelativeDate } from "@/lib/utils";
import { Media } from "@prisma/client";
import { MessageSquareIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Comments from "../comments/comments";
import Linkify from "../linkify";
import UserTooltip from "../user-tooltip";
import BookmarkButton from "./editor/bookmark-button";
import LikeButton from "./editor/like-button";
import PostMoreButton from "./post-more-button";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { username, avatarUrl, displayName, id } = post.user;
  const { user } = useSession();

  const [showComment, setShowComment] = useState(false);

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${username}`}>
              <UserAvatar avatarUrl={avatarUrl} />
            </Link>
          </UserTooltip>
          <div className="">
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${username}`}
                className="block font-medium hover:underline"
              >
                {displayName}
              </Link>
            </UserTooltip>
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
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <LikeButton
            postId={post.id}
            initialState={{
              likesCount: post._count.likes,
              isLikedByUser: post.likes.some((like) => like.userId === id),
            }}
          />
          <CommentButton
            post={post}
            onClick={() => setShowComment(!showComment)}
          />
        </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              (bookmark) => bookmark.userId === id,
            ),
          }}
        />
      </div>
      {showComment && <Comments post={post} />}
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((m) => (
        <MediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt="Attachment"
        width={500}
        height={500}
        className="max-h-{30rem] mx-auto size-fit rounded-2xl"
      />
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          controls
          src={media.url}
          className="max-h-{30rem] mx-auto size-fit rounded-2xl"
        ></video>
      </div>
    );
  }
  return <p className="text-destructive">Unsupported media type</p>;
}

interface CommentButtonProps {
  post: PostData;
  onClick: () => void;
}

function CommentButton({ post, onClick }: CommentButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessageSquareIcon className="text-sm font-medium tabular-nums" />
      {post._count.comments}{" "}
      <span className="hidden sm:inline">{`comment${post._count.comments === 1 ? "" : "s"}`}</span>
    </button>
  );
}
