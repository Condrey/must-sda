import { Prisma } from "@prisma/client";

export const userDataSelect = {
  username: true,
  avatarUrl: true,
  displayName: true,
  bio:true,
  createdAt:true,
  id: true,
} satisfies Prisma.UserSelect;

export type UserData = Prisma.UserGetPayload<{
  select:ReturnType <typeof getUserDataSelect>
}>

export function getUserDataSelect(loggedInUserId: string) {
  return {
    username: true,
    avatarUrl: true,
    displayName: true,
    createdAt: true,
    id: true,
    bio: true,

    followers: {
      where: { followerId: loggedInUserId },
      select: {
        followerId: true,
      },
    },
    _count: { select: { followers: true, posts: true } },
  } satisfies Prisma.UserSelect;
}

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
  } satisfies Prisma.PostInclude;
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export interface FollowerInfo {
  followersCount: number;
  isFollowingByUser: boolean;
}
