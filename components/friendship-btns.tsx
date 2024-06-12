import { user } from "@/lib/global";
import { Button } from "./ui/button";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  acceptFriendship,
  deleteFriendship,
  getFriendship,
  requestFriendship,
} from "@/app/actions/friendship";
import { Check, Trash } from "lucide-react";

export default function FriendshipButtons({
  currentUser,
  user,
  friendsTabView,
  searchView,
}: {
  user?: user | null;
  currentUser?: user | null;
  friendsTabView?: boolean;
  searchView?: boolean;
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
    queryKey: ["friendship", user?.username, currentUser?.username],
    queryFn: async () => {
      const { data } = await getFriendship(user?.id ?? "");
      return data;
    },
  });
  const binds = friendshipData?.binds as {
    receiver: z.infer<typeof UUID>;
    requester: z.infer<typeof UUID>;
  };
  const hasRequest = Boolean(friendshipData?.id);
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
      .channel(
        `friendship${user?.username}${currentUser?.username}${friendsTabView}`
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friendships", filter: `` },
        () => {
          refetchFriendship();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(friendships_channel);
    };
  }, [currentUser, refetchFriendship, supabase, user, friendsTabView]);

  if (friendsTabView === true)
    return (
      <div className="flex flex-row gap-2">
        {isAccepted ? (
          <Button
            size={"icon"}
            disabled={isPending}
            onClick={() => handleDeleteFriendship(user?.id)}
            variant="outline"
            className="rounded-full p-0 size-6"
          >
            <Trash className="size-4" />
          </Button>
        ) : iRequested ? (
          <Button
            size={"icon"}
            disabled={isPending}
            onClick={() => handleDeleteFriendship(user?.id)}
            variant="outline"
            className="rounded-full p-0 size-6"
          >
            <Trash className="size-4" />
          </Button>
        ) : (
          <>
            <Button
              size={"icon"}
              disabled={isPending}
              onClick={() => handleAcceptFriendship(user?.id)}
              className="rounded-full p-0 size-6"
            >
              <Check className="size-4" />
            </Button>
            <Button
              size={"icon"}
              disabled={isPending}
              onClick={() => handleDeleteFriendship(user?.id)}
              variant="outline"
              className="rounded-full p-0 size-6"
            >
              <Trash className="size-4" />
            </Button>
          </>
        )}
      </div>
    );

  return (
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
      ) : hasRequest ? (
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
          disabled={isPending || hasRequest}
          onClick={() => handleRequestFriendship(user?.id)}
          className="flex-1"
        >
          {error ? "Error" : isPending ? "Adding..." : "Add Friend"}
        </Button>
      )}
    </div>
  );
}
