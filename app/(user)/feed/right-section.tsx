"use client";
import { getFriends } from "@/app/actions/friendship";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import UserHoverCard from "@/components/user-hover-card";
import { user } from "@/lib/global";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { UserCircle } from "lucide-react";
import { useEffect } from "react";

export default function FeedRightSection({
  currentUser,
}: {
  currentUser?: user;
}) {
  const supabase = createClient();

  const { data, error, isLoading, refetch } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ["friends", currentUser?.username],
    queryFn: async () => await getFriends(),
  });

  //   useEffect(() => {
  //     const channel = supabase.channel("online_friends");
  //     channel
  //       .on("presence", { event: "sync" }, () => {
  //         const userIds = [];

  //         for (const id in channel.presenceState()) {
  //           // @ts-ignore
  //           userIds.push(channel.presenceState()[id][0].user_id);
  //         }
  //       })
  //       .subscribe(async (status) => {
  //         if (status === "SUBSCRIBED") {
  //           await channel.track({
  //             online_at: new Date().toISOString(),
  //             user_id: currentUser?.id,
  //           });
  //         }
  //       });

  //     return () => {
  //       supabase.removeChannel(channel);
  //     };
  //   }, [currentUser?.id, supabase]);

  useEffect(() => {
    if (!currentUser) return;
    const friendships = supabase
      .channel(`friendships${currentUser?.username}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friendships" },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(friendships);
    };
  }, [currentUser, refetch, supabase]);

  if (isLoading) return;

  if (currentUser)
    return (
      <ScrollArea className={`h-full flex-1 hidden lg:block`}>
        <div className="gap-2 flex flex-col overflow-auto pb-4">
          <div className="mt-4 text-sm font-bold flex gap-1 items-center">
            <p className="pl-4 w-full truncate">Friends</p>
            {/* <Circle className="fill-green-500 text-green-500 size-3" /> */}
          </div>
          <Separator />
          {data?.data?.map((friend) => {
            return (
              <UserHoverCard
                currentUser={currentUser}
                user={friend}
                key={friend.id}
              >
                <Button
                  variant={"ghost"}
                  key={friend.id}
                  className="gap-1 justify-start w-full"
                >
                  <UserCircle className="shrink-0" />
                  <p className="font-bold text-sm truncate">
                    {friend.fullname}
                  </p>
                </Button>
              </UserHoverCard>
            );
          })}
        </div>
      </ScrollArea>
    );
}
