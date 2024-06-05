"use client";
import FeedNav from "@/components/nav";
import { useQuery } from "@tanstack/react-query";
import getCurrentUser from "../actions/get-currentuser";
import { Separator } from "@/components/ui/separator";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: currentUser, isLoading: currentUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getCurrentUser(),
  });

  if (currentUserLoading) return;

  return (
    <div className="w-full h-full flex flex-col ">
      <FeedNav currentUser={currentUser?.data} />
      <Separator className="mt-4" />
      {children}
    </div>
  );
}
