"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { user } from "@/lib/global";
import { MessageCircle, Settings2, UserCircle, Users } from "lucide-react";

export default function FeedLeftSection({
  currentUser,
}: {
  currentUser?: user;
}) {
  if (currentUser)
    return (
      <ScrollArea className={`h-full flex-1 hidden lg:block`}>
        <div className="gap-2 flex flex-col overflow-auto pb-4">
          <Button variant={"outline"} className="mt-4 gap-1 h-fit">
            <UserCircle className="size-10 shrink-0" />
            <p className="text-left w-full font-bold ">
              {currentUser?.fullname}
            </p>
          </Button>

          <Button variant={"ghost"} className="gap-1">
            <MessageCircle />
            <p className="text-left w-full font-bold ">Messages</p>
          </Button>
          <Button variant={"ghost"} className="gap-1">
            <Users />
            <p className="text-left w-full font-bold ">Friend Requests</p>
          </Button>
          <Button variant={"ghost"} className="gap-1">
            <Settings2 />
            <p className="text-left w-full font-bold ">Settings</p>
          </Button>
        </div>
      </ScrollArea>
    );
}
