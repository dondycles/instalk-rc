import { Globe2, Loader2, Lock, ThumbsUp, UserCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { user } from "@/lib/global";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import likePost from "@/app/actions/like-post";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import getPostLikes from "@/app/actions/get-postlikes";
import unlikePost from "@/app/actions/unlike-post";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

export default function PostCard({
  post,
  user,
}: {
  post: PostTypes;
  user?: user;
}) {
  const supabase = createClient();
  const [isLikingPost, setIsLikingPost] = useState(false);
  const handleLike = async () => {
    if (!post) return;
    if (!user) return;
    setIsLikingPost(true);
    if (isLiked) {
      await unlikePost(post, user);
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
  });

  const isLiked = Boolean(
    latestPostLikes?.find((liker) => liker.user === user?.id)
  );

  useEffect(() => {
    const channels = supabase
      .channel(`post_likes${post.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "post_likes" },
        () => {
          refetchLatestLikes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [supabase]);
  return (
    <Card key={post.id}>
      <CardHeader className="text-sm">
        <UserHoverCard user={post?.users} currentUser={user}>
          <div className="flex gap-1 items-start">
            <UserCircle className="size-10 shrink-0" />
            <div>
              <div className="flex items-center flex-wrap">
                <p className="font-bold line-clamp-1 min-w-fit pr-1">
                  {post.users?.fullname}
                </p>
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
        </UserHoverCard>
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
          <button className="hover:underline">Comments</button>
        </div>
        {user && (
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
            <Input className="flex-1" placeholder="Comment" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

const UserHoverCard = ({
  children,
  user,
  currentUser,
}: {
  children: React.ReactNode;
  user?: user | null;
  currentUser?: user | null;
}) => {
  return (
    <HoverCard openDelay={250}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="w-fit gap-2 flex flex-col" align="start">
        <div className="flex flex-row gap-1 items-start">
          <UserCircle className="size-10 shrink-0" />
          <div className="flex flex-col ">
            <p className="font-bold line-clamp-1 min-w-fit pr-1">
              {user?.fullname}
            </p>
            <p>@{user?.username}</p>
          </div>
        </div>
        {currentUser && <Button>Add Friend</Button>}
      </HoverCardContent>
    </HoverCard>
  );
};
