import { Globe2, Lock, ThumbsUp, UserCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { user } from "@/lib/global";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function PostCard({
  post,
  user,
}: {
  post: PostTypes;
  user?: user;
}) {
  return (
    <Card key={post.id} className="">
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
          <button className="hover:underline">
            {post.post_likes?.length} Likes
          </button>
          <button className="hover:underline">Comments</button>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <Button size={"icon"}>
            <ThumbsUp className="size-4" />
          </Button>
          <Input className="flex-1" placeholder="Comment" />
        </div>
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
