import {
  Ellipsis,
  EyeOff,
  Flag,
  FlagOff,
  Globe2,
  Loader2,
  Lock,
  Menu,
  Pencil,
  ThumbsUp,
  Trash,
  UserCircle,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { user } from "@/lib/global";
import {
  likePost,
  getPostLikes,
  unlikePost,
  deletePost,
} from "@/app/actions/post";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import CommentForm from "./comment-form";
import { getALlComments } from "@/app/actions/comment";
import CommentCard from "./comment-card";
import UserHoverCard from "./user-hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import EditPostForm from "@/components/edit-post-form";

export default function PostFullDetailCard({
  post,
  currentUser,
  addMarginToFirstCard,
}: {
  post: PostTypes;
  currentUser?: user;
  addMarginToFirstCard?: boolean;
}) {
  const supabase = createClient();
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLikingPost, setIsLikingPost] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isMyPost = post.user === currentUser?.id;

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

  const handleDelete = async () => {
    if (!post) return;
    if (!currentUser) return;
    setIsDeleting(true);
    const { error } = await deletePost(post.id);
    if (error) setIsDeleting(false);
  };

  const {
    data: latestPostLikes,
    refetch: refetchLatestLikes,
    isLoading: latestPostLikesLoading,
  } = useQuery({
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

  const {
    data: allPostComments,
    refetch: refetchallPostComments,
    isLoading: allPostCommentsLoading,
  } = useQuery({
    queryKey: ["post_all_comments", post?.id],
    queryFn: async () => {
      const { data } = await getALlComments({ postId: post.id });
      return data;
    },
  });

  const isLoading = allPostCommentsLoading || latestPostLikesLoading;

  useEffect(() => {
    if (!currentUser || !post) return;
    const likes_channels = supabase
      .channel(`post_likes${post.id}${currentUser.id}full`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "post_likes",
          filter: `post=eq.${post.id}`,
        },
        () => {
          refetchLatestLikes();
        }
      )
      .subscribe();
    const comments_channels = supabase
      .channel(`post_comments${post.id}${currentUser.id}full`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "post_comments",
          filter: `post=eq.${post.id}`,
        },
        () => {
          refetchallPostComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(likes_channels);
      supabase.removeChannel(comments_channels);
    };
  }, [currentUser, post, refetchLatestLikes, refetchallPostComments, supabase]);

  if (isLoading) return;

  return (
    <Card
      className={`${addMarginToFirstCard === true && "first:mt-4"} ${
        isDeleting && "opacity-50"
      } h-full w-full flex flex-col overflow-auto`}
    >
      <CardHeader className="text-sm">
        <div className="flex gap-1 items-start">
          <UserCircle className="size-10 shrink-0" />
          <div className="flex-1">
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
          {isMyPost ? (
            <Dialog onOpenChange={setShowEditForm} open={showEditForm}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="aspect-square p-0 size-6"
                    variant={"ghost"}
                  >
                    <Ellipsis className="size-4 shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleDelete}>
                    <Trash className="size-4 mr-1" /> Delete
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Pencil className="size-4 mr-1" />
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <EditPostForm
                  close={() => setShowEditForm(false)}
                  postData={post}
                  currentUser={currentUser}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="aspect-square p-0 size-6" variant={"ghost"}>
                  <Ellipsis className="size-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <EyeOff className="size-4 mr-1" /> Hide
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag className="size-4 mr-1" /> Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{post.content}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 flex-1 h-full">
        <Separator />
        <div className="text-xs text-muted-foreground flex gap-4 justify-start w-full">
          <Dialog>
            <DialogTrigger asChild>
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
          <p>{allPostComments?.length} Comments</p>
        </div>
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
        {allPostComments?.length !== 0 && (
          <div className="w-full flex flex-col gap-2 pb-4">
            {allPostComments?.map((comment: PostCommentTypes) => {
              return (
                <CommentCard
                  comment={comment}
                  key={comment.id}
                  currentUser={currentUser}
                />
              );
            })}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
