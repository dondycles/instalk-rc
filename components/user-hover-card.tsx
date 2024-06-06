import { user } from "@/lib/global";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  requestFriendship,
  getFriendship,
  deleteFriendship,
  acceptFriendship,
} from "@/app/actions/friendship";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export default function UserHoverCard({
  children,
  user,
  currentUser,
}: {
  children: React.ReactNode;
  user?: user | null;
  currentUser?: user | null;
}) {
  const UUID = z.string().uuid({ message: "Not a valid UUID." });
  const supabase = createClient();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    data: friendshipData,
    error: friendshipError,
    refetch: refetchFriendship,
  } = useQuery({
    enabled: Boolean(user && currentUser),
    queryKey: ["friendship", user?.id, currentUser?.id],
    queryFn: async () => {
      const { data } = await getFriendship(user?.id ?? "");
      return data;
    },
  });
  const binds = friendshipData?.binds as {
    receiver: z.infer<typeof UUID>;
    requester: z.infer<typeof UUID>;
  };
  const isRequested = Boolean(friendshipData?.id);
  const iRequested = binds?.requester === currentUser?.id;
  const isAccepted = friendshipData?.is_accepted;

  const handleAcceptFriendship = async (user?: z.infer<typeof UUID>) => {
    if (!user || !currentUser) return;
    setIsPending(true);
    const { error } = await acceptFriendship(user);
    if (error) setError(error);
    setIsPending(false);
  };
  const handleRequestFriendship = async (user?: z.infer<typeof UUID>) => {
    if (!user || !currentUser) return;
    setIsPending(true);
    const { error } = await requestFriendship(user);
    if (error) setError(error);
    setIsPending(false);
  };
  const handleDeleteFriendship = async (user?: z.infer<typeof UUID>) => {
    if (!user || !currentUser) return;
    setIsPending(true);
    const { error } = await deleteFriendship(user);
    if (error) setError(error);
    setIsPending(false);
  };

  useEffect(() => {
    if (!currentUser || !user) return;
    const friendships_channel = supabase
      .channel(`friendship${user?.id}${currentUser?.id}`)
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
  }, [currentUser, refetchFriendship, supabase, user]);

  return (
    <HoverCard openDelay={250}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="w-fit gap-2 flex flex-col" align="start">
        <div className="flex flex-row gap-1 items-start">
          <UserCircle className="size-10 shrink-0" />
          <div className="flex flex-col text-sm">
            <p className="font-bold line-clamp-1 min-w-fit pr-1">
              {user?.fullname}
            </p>
            <p>@{user?.username}</p>
          </div>
        </div>
        {currentUser?.id !== user?.id && currentUser && (
          <div className="flex flex-row gap-4">
            {isAccepted ? (
              <>
                <Button disabled className="flex-1">
                  Friend
                </Button>
                <Button
                  disabled={isPending}
                  onClick={() => handleDeleteFriendship(user?.id)}
                  variant="outline"
                >
                  Unfriend
                </Button>
              </>
            ) : isRequested ? (
              iRequested ? (
                <>
                  <Button disabled className="flex-1">
                    Requested
                  </Button>
                  <Button
                    disabled={isPending}
                    onClick={() => handleDeleteFriendship(user?.id)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    disabled={isPending}
                    onClick={() => handleAcceptFriendship(user?.id)}
                    className="flex-1"
                  >
                    Accept
                  </Button>
                  <Button
                    disabled={isPending}
                    onClick={() => handleDeleteFriendship(user?.id)}
                    variant="outline"
                  >
                    Delete
                  </Button>
                </>
              )
            ) : (
              <Button
                disabled={isPending || isRequested}
                onClick={() => handleRequestFriendship(user?.id)}
                className="flex-1"
              >
                {error ? "Error" : isPending ? "Adding..." : "Add Friend"}
              </Button>
            )}
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
