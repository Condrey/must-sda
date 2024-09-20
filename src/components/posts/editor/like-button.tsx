"use client";

import { useToast } from "@/hooks/use-toast";
import kyInstance from "@/lib/ky";
import { LikesInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { HeartIcon } from "lucide-react";

interface LikeButtonProps {
  postId: string;
  initialState: LikesInfo;
}

export default function LikeButton({ postId, initialState }: LikeButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["like-info", postId];

  const { data } = useQuery({
    queryKey: queryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/likes`).json<LikesInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  // implementing optimistic updates
  const { mutate } = useMutation({
    mutationFn: () =>
      data.isLikedByUser
        ? kyInstance.delete(`/api/posts/${postId}/likes`)
        : kyInstance.post(`/api/posts/${postId}/likes`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<LikesInfo>(queryKey);

      queryClient.setQueryData<LikesInfo>(queryKey, () => ({
        likesCount:
          (previousState?.likesCount || 0) +
          (previousState?.isLikedByUser ? -1 : 1),
        isLikedByUser: !previousState?.isLikedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    },
  });

  return (
    <button className="flex items-center gap-2" onClick={() => mutate()}>
      <HeartIcon
        className={cn(
          "size-5",
          data.isLikedByUser && "fill-red-500 text-red-500",
        )}
      />
      <span className="text-sm font-medium tabular-nums">
        {data.likesCount}{" "}
        <span className="hidden sm:inline">{`like${data.likesCount === 1 ? "" : "s"}`}</span>
      </span>
    </button>
  );
}
