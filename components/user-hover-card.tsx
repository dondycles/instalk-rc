import { user } from "@/lib/global";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { UserCircle } from "lucide-react";

import Link from "next/link";
import FriendshipButtons from "./friendship-btns";

export default function UserHoverCard({
  children,
  user,
  currentUser,
}: {
  children: React.ReactNode;
  user?: user | null;
  currentUser?: user | null;
}) {
  return (
    <HoverCard openDelay={250}>
      <HoverCardTrigger asChild>
        <Link href={`/u/${user?.username}`} className="hover:underline">
          {children}
        </Link>
      </HoverCardTrigger>
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
          <FriendshipButtons currentUser={currentUser} user={user} />
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
