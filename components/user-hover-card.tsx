import { user } from "@/lib/global";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import addFriend from "@/app/actions/add-friend";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getFriendship from "@/app/actions/get-friendship";
import unFriend from "@/app/actions/un-friend";

export default function UserHoverCard({
  children,
  user,
  currentUser,
}: {
  children: React.ReactNode;
  user?: user | null;
  currentUser?: user | null;
}) {
  const supabase = createClient();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    data: friendshipData,
    error: friendshipError,
    refetch: refetchFriendship,
  } = useQuery({
    enabled: Boolean(user),
    queryKey: ["friendship", user?.id],
    queryFn: async () => {
      const { data } = await getFriendship(user?.id ?? "", false);
      return data;
    },
  });

  const isAdded = Boolean(friendshipData?.id);

  const handleAddFriend = async (user?: string) => {
    if (!user) return;
    setIsPending(true);
    const { error } = await addFriend(user);
    if (error) setError(error);
    setIsPending(false);
  };

  const handleUnfriend = async (user?: string) => {
    if (!user) return;
    setIsPending(true);
    const { error } = await unFriend(user);
    if (error) setError(error);
    setIsPending(false);
  };

  useEffect(() => {
    if (!user) return;
    const friendships_channel = supabase
      .channel(`friendships${user?.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friendships" },
        () => {
          refetchFriendship();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(friendships_channel);
    };
  }, [supabase, user, friendshipData, refetchFriendship]);

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
        {currentUser?.id !== user?.id && currentUser && (
          <div className="flex flex-row gap-4">
            <Button
              disabled={isPending || isAdded}
              onClick={() => handleAddFriend(user?.id)}
              className="flex-1"
            >
              {isAdded
                ? "Requested"
                : error
                ? "Error"
                : isPending
                ? "Adding..."
                : "Add Friend"}
            </Button>
            {isAdded && (
              <Button
                disabled={isPending}
                onClick={() => handleUnfriend(user?.id)}
                variant={"outline"}
              >
                Cancel
              </Button>
            )}
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
