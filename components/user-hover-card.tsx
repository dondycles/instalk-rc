import { user } from "@/lib/global";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import addFriend from "@/app/actions/add-friend";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import getFriendship from "@/app/actions/get-friendship";

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
      const { data } = await getFriendship(user?.id ?? "");
      return data;
    },
  });

  const handleAddFriend = async (user?: string) => {
    if (!user) return;
    setIsPending(true);
    const { error } = await addFriend(user);
    if (error) setError(error);
    setIsPending(false);
  };

  useEffect(() => {
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
  }, [supabase]);

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
          <Button
            disabled={isPending}
            onClick={() => handleAddFriend(user?.id)}
          >
            {error ? "Error" : isPending ? "Adding..." : "Add Friend"}
          </Button>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
