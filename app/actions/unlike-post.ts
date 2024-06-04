"use server";

import { user } from "@/lib/global";
import { createClient } from "@/lib/supabase/server";

export default async function unlikePost(
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
