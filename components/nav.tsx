"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { FaUserCircle } from "react-icons/fa";
import logOut from "@/app/actions/logout";
import { useQueryClient } from "@tanstack/react-query";

import Link from "next/link";

import { useEffect, useState } from "react";
import searchUser from "@/app/actions/search-user";
import { useDebounce } from "@/lib/useDebounce";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaMessage } from "react-icons/fa6";
import { user } from "@/lib/global";
import { UserCircle } from "lucide-react";
import FriendshipButtons from "./friendship-btns";
export default function FeedNav({ currentUser }: { currentUser?: user }) {
  const [focused, setFocused] = useState(false);
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const [result, setResult] = useState<user[]>();

  const [showResults, setShowResults] = useState(false);

  const handleLogOut = async () => {
    if (!currentUser) return;
    queryClient.clear();
    await logOut();
  };
  useEffect(() => {
    if (!currentUser) return;
    if (query === "") return setShowResults(false);
    const handleSearch = async () => {
      const { data } = await searchUser(debouncedQuery);
      setResult(data);
      setShowResults(true);
    };
    handleSearch();
  }, [debouncedQuery, query, currentUser]);

  return (
    <nav className="flex gap-4 items-center pt-4 px-4  h-14">
      <Link href={"/feed"} className={`font-bold sm:block hidden`}>
        Instalk.
      </Link>
      <div className="flex-1 relative h-fit">
        <Input
          onFocus={() => {
            if (query !== "") {
              setShowResults(true);
            }
          }}
          onBlur={() => {
            if (focused) return;
            setShowResults(false);
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full z-10"
        />
        {showResults && (
          <div
            onClick={() => setFocused(true)}
            onMouseOver={() => setFocused(true)}
            onMouseLeave={() => setFocused(false)}
            className="fixed left-4 right-4  p-4 top-16 h-fit z-10 bg-white border rounded-md"
          >
            <p className="text-muted-foreground text-sm mb-4">results...</p>
            <ScrollArea className="max-h-[200px] w-full">
              <div className="flex flex-col gap-4 overflow-y-auto w-full h-full max-h-full">
                {result?.length ? (
                  result?.map((res) => {
                    return (
                      <div key={res.id} className="flex flex-row gap-2 w-full">
                        <Button
                          asChild
                          variant={"ghost"}
                          className="gap-1 text-sm h-fit flex-1 min-w-0"
                        >
                          <Link target="_parent" href={`/u/${res.username}`}>
                            <UserCircle className="size-6 shrink-0" />
                            <p className="text-left flex-1 font-bold truncate">
                              {res.fullname}
                            </p>
                          </Link>
                        </Button>
                        <FriendshipButtons
                          currentUser={currentUser}
                          user={res}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground text-center">
                    No result.
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
      {currentUser ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"}>
                <FaMessage className="text-xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Messages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>No messages yet...</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"}>
                <FaUserCircle className="text-xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={"/u/" + currentUser?.username}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogOut}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Button asChild>
          <Link href={"/login"}>Log In</Link>
        </Button>
      )}
    </nav>
  );
}
