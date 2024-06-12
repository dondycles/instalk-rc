"use server";

import { createClient } from "@/lib/supabase/server";

export async function comment(data: {
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

export async function getLimitedComments(data: {
  postId: string;
  commentId?: string;
}) {
  const supabase = createClient();
  const { error, data: comments } = await supabase
    .from("post_comments")
    .select("*, users(id,fullname,username)")
    .eq("post", data.postId)
    .order("created_at", { ascending: false })
    .limit(4);
  if (error) return { error: error };
  return { data: comments };
}

export async function getALlComments(data: {
  postId: string;
  commentId?: string;
}) {
  const supabase = createClient();
  const { error, data: comments } = await supabase
    .from("post_comments")
    .select("*, users(id,fullname,username)")
    .eq("post", data.postId)
    .order("created_at", { ascending: false });
  if (error) return { error: error };
  return { data: comments };
}

export async function getCommentCounts(data: { postId: string }) {
  const supabase = createClient();
  const { error, data: counts } = await supabase
    .from("post_comments")
    .select("id")
    .eq("post", data.postId);
  if (error) return { error: error };
  return { data: counts.length };
}
