"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import FeedSection from "./feed-section";
import getCurrentUser from "@/app/actions/get-currentuser";
import { Loader2 } from "lucide-react";

export default function Feed() {
  const queryClient = useQueryClient();
  const {
    data: userData,
    error: userDataError,
    isLoading: userDataLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getCurrentUser(),
    initialData: () => {
      return queryClient.getQueryData(["user"]);
    },
  });
  if (userDataLoading)
    return (
      <div className="text-center text-muted-foreground text-xs flex flex-row gap-2 items-center justify-center">
        <p>Loading current user... </p>{" "}
        <Loader2 className="animate-spin size-4" />
      </div>
    );
  return (
    <main className="p-4 pb-0 h-full overflow-auto flex gap-4">
      <FeedSection user={userData?.data} />
    </main>
  );
}
