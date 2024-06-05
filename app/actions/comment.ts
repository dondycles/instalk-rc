"use server";

import { createClient } from "@/lib/supabase/server";

export default async function comment(data: {
  content: string;
  postId: string;
  commentId?: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.from("post_comments").insert({
    content: data.content,
    post: data.postId,
    comment: data.commentId,
  });
  if (error) return { error: error };
  return { success: "Commented" };
}
