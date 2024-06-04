"use server";

import { createClient } from "@/lib/supabase/server";

export default async function likePost(post: Pick<PostTypes, "id">) {
  const supabase = createClient();
  const { error } = await supabase.from("post_likes").insert({
    post: post.id,
  });
  if (error) return { error: error };
  return { success: "Post liked!" };
}
