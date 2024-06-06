"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import FeedSection from "./feed-section";
import getCurrentUser from "@/app/actions/get-currentuser";
import { Loader2 } from "lucide-react";
import FeedRightSection from "./right-section";
import { useEffect, useState } from "react";
import FeedLeftSection from "./left-section";

export default function Feed() {
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { data: currentUserData, isLoading: currentUserDataLoading } = useQuery(
    {
      queryKey: ["user"],
      queryFn: async () => await getCurrentUser(),
      initialData: () => {
        return queryClient.getQueryData(["user"]);
      },
    }
  );

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // true for mobile device
      setIsMobile(true);
    } else {
      // false for not mobile device
      setIsMobile(false);
    }
    setMounted(true);
  }, []);

  if (currentUserDataLoading)
    return (
      <div className="text-center text-muted-foreground text-xs flex flex-row gap-2 items-center justify-center">
        <p>Loading current user... </p>{" "}
        <Loader2 className="animate-spin size-4" />
      </div>
    );

  if (mounted && !currentUserData)
    return (
      <main className="px-4 h-full overflow-auto flex gap-4 justify-center ">
        <FeedSection />
      </main>
    );

  if (mounted && currentUserData)
    return (
      <main className="px-4 h-full overflow-auto flex gap-4 justify-center ">
        {isMobile ? (
          <FeedSection currentUser={currentUserData?.data} />
        ) : (
          <>
            <FeedLeftSection currentUser={currentUserData?.data} />
            <FeedSection currentUser={currentUserData?.data} />
            <FeedRightSection currentUser={currentUserData?.data} />
          </>
        )}
      </main>
    );
}
