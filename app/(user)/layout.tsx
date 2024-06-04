"use client";
import FeedNav from "@/components/nav";
import { useQuery } from "@tanstack/react-query";
import getCurrentUser from "../actions/get-currentuser";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getCurrentUser(),
  });

  if (userDataLoading) return;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <FeedNav user={userData?.data} />
      {children}
    </div>
  );
}
