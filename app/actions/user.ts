"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
const UUID = z.string().uuid({ message: "Not a valid UUID." });

export async function getUserProfile(username: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();
  console.log(error);
  if (error) return { error: error };
  return { data: data };
}

export async function getUserLatestPosts(userId: z.infer<typeof UUID>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*,users(id,username,fullname) ,post_likes(*, users(id,username,fullname)), post_comments(*, users(id,username, fullname))"
    )
    .eq("user", userId)
    .order("created_at", {
      ascending: false,
    })
    .order("created_at", { referencedTable: "post_comments", ascending: false })
    .limit(4, { referencedTable: "post_comments" })
    .limit(4);

  if (error) return { error: error };
  return { data: data };
}
