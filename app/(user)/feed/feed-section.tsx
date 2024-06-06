"use client";

import getPosts from "@/app/actions/get-posts";
import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { user } from "@/lib/global";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import PostForm from "./post-form";
import { createClient } from "@/lib/supabase/client";

export default function FeedSection({ currentUser }: { currentUser?: user }) {
  const supabase = createClient();
  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["feed", currentUser?.id],
    queryFn: async () => await getPosts(),
  });

  const [expandCreatePost, setExpandCreatePost] = useState(false);

  useEffect(() => {
    const channels = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => {
          refetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [supabase]);

  if (postsLoading)
    return (
      <div className="text-center text-muted-foreground text-xs flex flex-row gap-2 items-center justify-center h-fit w-full">
        <p>Getting posts... </p> <Loader2 className="animate-spin size-4" />
      </div>
    );

  if (posts?.error || postsError)
    return (
      <div className="text-center text-destructive text-xs flex flex-row gap-2 items-center justify-center h-fit w-full">
        <p>Error getting posts</p>
      </div>
    );

  return (
    <ScrollArea className="h-full flex-1 max-w-[600px]">
      <div className="gap-4 flex flex-col overflow-auto pb-4">
        {currentUser && (
          <PostForm
            expandCreatePost={expandCreatePost}
            setExpandCreatePost={(value) => setExpandCreatePost(value)}
            currentUser={currentUser}
          />
        )}

        {posts?.data?.map((post) => {
          return (
            <PostCard key={post.id} post={post} currentUser={currentUser} />
          );
        })}
      </div>
    </ScrollArea>
  );
}
