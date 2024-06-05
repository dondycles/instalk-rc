"use server";

import { createClient } from "@/lib/supabase/server";

export default async function getComments(data: {
  postId: string;
  commentId?: string;
}) {
  const supabase = createClient();
  const { error, data: comments } = await supabase
    .from("post_comments")
    .select("*, users(fullname,username)")
    .eq("post", data.postId)
    .order("created_at", { ascending: false })
    .limit(4);
  if (error) return { error: error };
  return { data: comments };
}
