import { Globe2, Loader2, Lock, ThumbsUp, UserCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { user } from "@/lib/global";
import likePost from "@/app/actions/like-post";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import getPostLikes from "@/app/actions/get-postlikes";
import unlikePost from "@/app/actions/unlike-post";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import CommentForm from "@/app/(user)/feed/comment-form";
import getComments from "@/app/actions/get-comments";
import CommentCard from "./comment-card";
import UserHoverCard from "./user-hover-card";

export default function PostCard({
  post,
  currentUser,
}: {
  post: PostTypes;
  currentUser?: user;
}) {
  const supabase = createClient();
  const [showComments, setShowComments] = useState(false);
  const [isLikingPost, setIsLikingPost] = useState(false);
  const handleLike = async () => {
    if (!post) return;
    if (!currentUser) return;
    setIsLikingPost(true);
    if (isLiked) {
      await unlikePost(post, currentUser);
      setTimeout(() => {
        setIsLikingPost(false);
      }, 1000);
      return;
    }
    await likePost(post);
    setTimeout(() => {
      setIsLikingPost(false);
    }, 1000);
  };

  const { data: latestPostLikes, refetch: refetchLatestLikes } = useQuery({
    queryKey: ["post_likes", post?.id],
    queryFn: async () => {
      const { data } = await getPostLikes(post);
      return data;
    },
    initialData: post.post_likes,
    staleTime: 60000,
  });
  const isLiked = Boolean(
    latestPostLikes?.find((liker) => liker.user === currentUser?.id)
  );

  const { data: latestPostComments, refetch: refetchLatestPostComments } =
    useQuery({
      queryKey: ["post_comments", post?.id],
      queryFn: async () => {
        const { data } = await getComments({ postId: post.id });
        return data;
      },
      initialData: post.post_comments,
      staleTime: 60000,
      enabled: showComments,
    });

  useEffect(() => {
    const likes_channels = supabase
      .channel(`post_likes${post.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "post_likes" },
        () => {
          refetchLatestLikes();
        }
      )
      .subscribe();

    const comments_channels = supabase
      .channel(`post_comments${post.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "post_comments" },
        () => {
          refetchLatestPostComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(likes_channels);
      supabase.removeChannel(comments_channels);
    };
  }, [supabase]);
  return (
    <Card>
      <CardHeader className="text-sm">
        <div className="flex gap-1 items-start">
          <UserCircle className="size-10 shrink-0" />
          <div>
            <div className="flex items-center flex-wrap">
              <UserHoverCard user={post?.users} currentUser={currentUser}>
                <p className="font-bold line-clamp-1 min-w-fit pr-1">
                  {post.users?.fullname}
                </p>
              </UserHoverCard>

              <p>@{post.users?.username}</p>
            </div>
            <div className="flex items-center flex-wrap gap-x-1">
              {post.privacy === "public" ? (
                <Globe2 className="size-3" />
              ) : (
                <Lock className="size-3" />
              )}
              <p className="text-xs text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Separator />
        <div className="text-xs text-muted-foreground flex gap-4 justify-start w-full">
          <Dialog>
            <DialogTrigger>
              <button
                disabled={!latestPostLikes?.length}
                className="hover:underline"
              >
                {latestPostLikes?.length} Likes
              </button>
            </DialogTrigger>
            <DialogContent>
              <ScrollArea>
                <div className="flex flex-col gap-4 max-h-[60dvh]">
                  {latestPostLikes?.map((liker: PostLikeTypes) => {
                    return (
                      <Card key={liker.id}>
                        <CardHeader>
                          <div className="flex flex-row items-start gap-2">
                            <UserCircle className="text-muted-foreground size-10 shrink-0" />
                            <div className="text-sm text-muted-foreground">
                              <p className="font-semibold">
                                {liker.users?.fullname}
                              </p>
                              <p>@{liker.users?.username}</p>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="hover:underline"
          >
            Comments
          </button>
        </div>
        {showComments &&
          latestPostComments?.map((comment: PostCommentTypes) => {
            return (
              <CommentCard
                comment={comment}
                key={comment.id}
                currentUser={currentUser}
              />
            );
          })}

        {currentUser && (
          <div className="flex flex-row gap-4 w-full">
            <Button
              disabled={isLikingPost}
              onClick={handleLike}
              size={"icon"}
              variant={isLiked ? "default" : "ghost"}
            >
              {isLikingPost ? (
                <Loader2 className="animate-spin size-4" />
              ) : (
                <ThumbsUp className="size-4" />
              )}
            </Button>
            <CommentForm postId={post.id} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
