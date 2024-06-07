"use client";

import { getUserLatestPosts, getUserProfile } from "@/app/actions/user";
import FriendshipButtons from "@/components/friendship-btns";
import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { user } from "@/lib/global";
import { useQuery } from "@tanstack/react-query";
import { Loader2, UserCircle } from "lucide-react";

export default function ProfileSection({
  username,
  currentUser,
  isCurrentUserProfile,
}: {
  username: string;
  currentUser?: user;
  isCurrentUserProfile?: boolean;
}) {
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
      </ScrollArea>
    </div>
  );
}
