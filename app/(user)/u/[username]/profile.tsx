"use client";

import {
  getFriends,
  getReceivedRequests,
  getSentRequests,
} from "@/app/actions/friendship";
import { getUserLatestPosts, getUserProfile } from "@/app/actions/user";
import FriendshipButtons from "@/components/friendship-btns";
import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserHoverCard from "@/components/user-hover-card";
import { user } from "@/lib/global";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2, UserCircle } from "lucide-react";
import { useEffect } from "react";

export default function ProfileSection({
  username,
  currentUser,
  isCurrentUserProfile,
  tab,
}: {
  username: string;
  currentUser?: user;
  isCurrentUserProfile?: boolean;
  tab: string;
}) {
  const getTabSelection = () => {
    if (tab !== "posts" && tab !== "friends") {
      return "posts";
    }
    return tab;
  };

  const supabase = createClient();
  const {
    data: userProfileData,
    error: userDataProfileError,
    isLoading: userProfileDataLoading,
  } = useQuery({
    enabled: Boolean(username),
    queryKey: ["userprofile", username],
    queryFn: async () => await getUserProfile(username),
  });

  const {
    data: userLatestPosts,
    error: userLatestPostsError,
    isLoading: userLatestPostsLoading,
  } = useQuery({
    enabled: userProfileData?.data !== undefined,
    queryKey: ["userposts", username],
    queryFn: async () => {
      const { data } = await getUserLatestPosts(
        userProfileData?.data?.id ?? ""
      );
      return data;
    },
  });

  const {
    data: receivedRequests,
    error: receivedRequestsError,
    refetch: refetchReceivedRequests,
  } = useQuery({
    enabled: Boolean(isCurrentUserProfile),
    queryKey: ["receivedrequests", username],
    queryFn: async () => await getReceivedRequests(),
  });

  const {
    data: sentRequests,
    error: sentRequestsError,
    refetch: refetchSentRequests,
  } = useQuery({
    enabled: Boolean(isCurrentUserProfile),
    queryKey: ["sentrequests", username],
    queryFn: async () => await getSentRequests(),
  });

  const {
    data: friends,
    error: friendsError,
    refetch: refetchfriends,
  } = useQuery({
    queryKey: ["friends", username],
    queryFn: async () => await getFriends(),
  });

  useEffect(() => {
    const friendships = supabase
      .channel(`allfriends${username}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friendships" },
        () => {
          refetchfriends();
          if (!isCurrentUserProfile) return;
          refetchReceivedRequests();
          refetchSentRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(friendships);
    };
  }, [
    isCurrentUserProfile,
    refetchReceivedRequests,
    refetchSentRequests,
    refetchfriends,
    supabase,
    username,
  ]);

  if (userProfileDataLoading || userLatestPostsLoading)
    return (
      <div className="mt-4 text-center text-muted-foreground text-xs flex flex-row gap-2 items-center justify-center h-fit w-full">
        <p>Getting user data... </p> <Loader2 className="animate-spin size-4" />
      </div>
    );

  return (
    <div className="w-full h-full">
      <ScrollArea className="h-full w-full">
        <div className="mt-4 pb-4 flex flex-col items-center">
          <div className="bg-muted rounded-md w-full h-48 sm:h-64  relative"></div>
          <UserCircle className="-mt-12 sm:-mt-16 z-10 size-24 sm:size-32 p-1 bg-muted rounded-full " />
          <p className="font-bold text-lg sm:text-xl mt-4">
            {userProfileData?.data?.fullname}
          </p>
          <p className="text-muted-foreground text-sm">
            @{userProfileData?.data?.username}
          </p>
          {!isCurrentUserProfile && (
            <div className="mt-4">
              <FriendshipButtons
                currentUser={currentUser}
                user={userProfileData?.data}
              />
            </div>
          )}
        </div>
        <Tabs defaultValue={getTabSelection()} className="space-y-0">
          <TabsList className="grid w-fit mx-auto grid-cols-2">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div className="gap-4 flex flex-col overflow-auto pb-4 max-w-[600px] mx-auto">
              {userLatestPosts?.map((post) => {
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    addMarginToFirstCard={true}
                  />
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="friends">
            <p className="font-bold text-sm ">
              Friends ({friends?.data?.length})
            </p>
            <Separator />
            {friends?.data?.map((friend) => {
              return (
                <Card
                  key={friend.id}
                  className="flex flex-col text-sm w-fit h-fit"
                >
                  <CardHeader className="flex flex-row gap-4 items-center">
                    <div className="flex flex-row gap-1">
                      <UserCircle className="size-10 shrink-0" />
                      <div>
                        <p className="font-bold">{friend.fullname}</p>
                        <p className="text-muted-foreground">
                          @{friend.username}
                        </p>
                      </div>
                    </div>
                    <FriendshipButtons
                      currentUser={currentUser}
                      user={friend}
                      friendsTabView={true}
                    />
                  </CardHeader>
                </Card>
              );
            })}
            {isCurrentUserProfile && (
              <>
                <p className="font-bold text-sm ">
                  Sent Requests ({sentRequests?.data?.length})
                </p>
                <Separator />
                {sentRequests?.data?.map((friend) => {
                  return (
                    <Card
                      key={friend.id}
                      className="flex flex-col text-sm w-fit h-fit"
                    >
                      <CardHeader className="flex flex-row gap-4 items-center">
                        <div className="flex flex-row gap-1">
                          <UserCircle className="size-10 shrink-0" />
                          <div>
                            <p className="font-bold">{friend.fullname}</p>
                            <p className="text-muted-foreground">
                              @{friend.username}
                            </p>
                          </div>
                        </div>
                        <FriendshipButtons
                          currentUser={currentUser}
                          user={friend}
                          friendsTabView={true}
                        />
                      </CardHeader>
                    </Card>
                  );
                })}
                <p className="font-bold text-sm ">
                  Received Requests ({receivedRequests?.data?.length})
                </p>
                <Separator />
                {receivedRequests?.data?.map((friend) => {
                  return (
                    <Card
                      key={friend.id}
                      className="flex flex-col text-sm w-fit h-fit"
                    >
                      <CardHeader className="flex flex-row gap-4 items-center">
                        <div className="flex flex-row gap-1">
                          <UserCircle className="size-10 shrink-0" />
                          <div>
                            <p className="font-bold">{friend.fullname}</p>
                            <p className="text-muted-foreground">
                              @{friend.username}
                            </p>
                          </div>
                        </div>
                        <FriendshipButtons
                          currentUser={currentUser}
                          user={friend}
                          friendsTabView={true}
                        />
                      </CardHeader>
                    </Card>
                  );
                })}
              </>
            )}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}
