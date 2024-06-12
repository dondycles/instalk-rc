"use client";
import { getReceivedRequests } from "@/app/actions/friendship";
import logOut from "@/app/actions/logout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { user } from "@/lib/global";
import { createClient } from "@/lib/supabase/client";
import { useLeftFeedSectionState } from "@/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  ListCollapse,
  LogOut,
  MessageCircle,
  Settings2,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function FeedLeftSection({
  currentUser,
}: {
  currentUser?: user;
}) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const leftFeedSectionState = useLeftFeedSectionState();
  const {
    data: receivedRequests,
    error: receivedRequestsError,
    refetch: refetchReceivedRequests,
  } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ["receivedrequests", currentUser?.username],
    queryFn: async () => await getReceivedRequests(),
  });

  const handleLogOut = async () => {
    if (!currentUser) return;
    queryClient.clear();
    await logOut();
  };

  useEffect(() => {
    if (!currentUser) return;
    const friendships = supabase
      .channel(`receivedrequests${currentUser?.username}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friendships" },
        () => {
          refetchReceivedRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(friendships);
    };
  }, [currentUser, refetchReceivedRequests, supabase]);

  if (currentUser)
    return (
      <ScrollArea
        className={`h-full hidden lg:block min-w-0 ${
          leftFeedSectionState.collapse ? "w-fit" : "w-full"
        }`}
      >
        <div className="gap-2 flex flex-col overflow-auto pb-4 w-full ">
          <Button
            asChild
            variant={"ghost"}
            className={`mt-4 gap-1 h-fit w-full min-w-0   ${
              leftFeedSectionState.collapse ? "justify-center" : "justify-start"
            }`}
          >
            <Link href={`/u/${currentUser.username}`}>
              <UserCircle className="size-10 shrink-0" />
              {!leftFeedSectionState.collapse && (
                <p className="text-left flex-1 font-bold truncate pr-[1px]">
                  {currentUser?.fullname}
                </p>
              )}
            </Link>
          </Button>

          <Button
            variant={"ghost"}
            className={`gap-1 justify-start ${
              leftFeedSectionState.collapse ? "justify-center" : "justify-start"
            }`}
          >
            <MessageCircle className="shrink-0" />
            {!leftFeedSectionState.collapse && (
              <p className="text-left w-full font-bold truncate pr-[1px]">
                Messages
              </p>
            )}
          </Button>
          <Button
            asChild
            variant={"ghost"}
            className={`gap-1 justify-start relative ${
              leftFeedSectionState.collapse ? "justify-center" : "justify-start"
            }`}
          >
            <Link href={`/u/${currentUser.username}?tab=friends`}>
              <Users className="shrink-0" />
              {!leftFeedSectionState.collapse && (
                <p className="text-left font-bold truncate pr-[1px]">Friends</p>
              )}
              {receivedRequests?.data?.length !== 0 && (
                <div
                  className={`bg-red-500 rounded-full aspect-square size-4 flex items-center justify-center text-white text-[10px] shrink-0 w-fit ${
                    leftFeedSectionState.collapse
                      ? "absolute -top-1 right-4"
                      : ""
                  }`}
                >
                  {receivedRequests?.data?.length}
                </div>
              )}
            </Link>
          </Button>
          <Button
            variant={"ghost"}
            className={`gap-1 justify-start ${
              leftFeedSectionState.collapse ? "justify-center" : "justify-start"
            }`}
          >
            <Settings2 className="shrink-0" />
            {!leftFeedSectionState.collapse && (
              <p className="text-left w-full font-bold truncate pr-[1px]">
                Settings
              </p>
            )}
          </Button>
          <Button
            className={`gap-1 justify-start ${
              leftFeedSectionState.collapse ? "justify-center" : "justify-start"
            }`}
            variant={"ghost"}
            onClick={handleLogOut}
          >
            <LogOut className="shrink-0" />
            {!leftFeedSectionState.collapse && (
              <p className="text-left w-full font-bold truncate pr-[1px]">
                Log Out
              </p>
            )}
          </Button>
          <Button
            className={`gap-1 justify-start ${
              leftFeedSectionState.collapse ? "justify-center" : "justify-start"
            }`}
            variant={"ghost"}
            onClick={() => leftFeedSectionState.toggleCollapse()}
          >
            {leftFeedSectionState.collapse ? (
              <ChevronRight />
            ) : (
              <ChevronLeft className="shrink-0" />
            )}
            {!leftFeedSectionState.collapse && (
              <p className="text-left w-full font-bold truncate pr-[1px]">
                Collapse
              </p>
            )}
          </Button>
        </div>
      </ScrollArea>
    );
}
