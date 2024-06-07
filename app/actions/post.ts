"use server";

import { post as posttype, user } from "@/lib/global";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
const UUID = z.string().uuid({ message: "Not a valid UUID." });

export async function post(post: Pick<posttype, "content" | "privacy">) {
  const supabase = createClient();

  const { error } = await supabase.from("posts").insert({
    content: post.content,
    privacy: post.privacy,
  });
  if (error) return { error: error };
  return { success: "Posted!" };
}

export async function getPosts() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "*,users(id,username,fullname) ,post_likes(*, users(id,username,fullname)), post_comments(*, users(id,username, fullname))"
    )
    .order("created_at", {
      ascending: false,
    })
    .order("created_at", { referencedTable: "post_comments", ascending: false })
    .limit(4, { referencedTable: "post_comments" })
    .limit(4);
  if (error) return { error: error };
  return { data: data };
}

export async function getPostLikes(post: Pick<PostTypes, "id">) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("post_likes")
    .select("*, users(id,username,fullname)")
    .eq("post", post.id);

  if (error) return { error: error };
  return { data: data };
}

export async function getPostComments(data: {
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

export async function likePost(post: Pick<PostTypes, "id">) {
  const supabase = createClient();

  const { error } = await supabase.from("post_likes").insert({
    post: post.id,
  });
  if (error) return { error: error };
  return { success: "Post liked!" };
}

export async function unlikePost(
  post: Pick<PostTypes, "id">,
  user: Pick<user, "id">
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("post_likes")
    .delete()
    .match({ post: post.id, user: user.id });
  if (error) return { error: error };
  return { success: "Post unliked!" };
}

export async function editPost(
  post: Pick<PostTypes, "id" | "content" | "privacy">
) {
  const supabase = createClient();

  const { error } = await supabase.from("posts").update(post).eq("id", post.id);

  if (error) return { error: error };
  return { success: "Post edited." };
}

export async function deletePost(postId: z.infer<typeof UUID>) {
  const supabase = createClient();

  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) return { error: error };
  return { success: "Post deleted." };
}
