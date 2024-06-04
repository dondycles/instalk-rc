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
export default function FeedNav({ user }: { user?: user }) {
  const [focused, setFocused] = useState(false);
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const [result, setResult] = useState<user[]>();

  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!user) return;
    const { data } = await searchUser(debouncedQuery);
    setResult(data);
    setShowResults(true);
  };
  const handleLogOut = async () => {
    if (!user) return;
    queryClient.clear();
    await logOut();
  };
  useEffect(() => {
    if (!user) return;
    if (query === "") return setShowResults(false);
    handleSearch();
  }, [debouncedQuery]);

  return (
    <nav className="flex gap-4 items-center pt-4 px-4  h-14">
      <Link href={"/feed"} className="font-bold">
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
            className="w-full p-4 absolute top-[calc(100%+16px)] left-0 h-fit z-10 bg-white border rounded-md"
          >
            <p className="text-muted-foreground text-sm mb-4">results...</p>
            <ScrollArea className="max-h-[200px] w-full">
              <div className="flex flex-col gap-4 overflow-auto h-full max-h-full">
                {result?.length ? (
                  result?.map((res) => {
                    return (
                      <Button
                        key={res.id}
                        asChild
                        variant={"ghost"}
                        className="gap-1"
                      >
                        <Link
                          target="_parent"
                          href={
                            res.id === user?.id ? "/profile" : "/u/" + res.id
                          }
                        >
                          <FaUserCircle className="text-2xl min-w-fit" />
                          <p className="text-left w-full">{res.fullname}</p>
                        </Link>
                      </Button>
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
      {user ? (
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
                <Link href={"/u/" + user?.username}>Profile</Link>
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
