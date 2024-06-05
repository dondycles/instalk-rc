"use server";

import { createClient } from "@/lib/supabase/server";

export default async function getPostLikes(post: Pick<PostTypes, "id">) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post_likes")
    .select("*, users(id,username,fullname)")
    .eq("post", post.id);

  if (error) return { error: error };
  return { data: data };
}
