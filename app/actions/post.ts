"use server";

import { post as posttype } from "@/lib/global";
import { createClient } from "@/lib/supabase/server";

export default async function post(
  post: Pick<posttype, "content" | "privacy">
) {
  const supabase = createClient();
  const { error } = await supabase.from("posts").insert({
    content: post.content,
    privacy: post.privacy,
  });
  if (error) return { error: error };
  return { success: "Posted!" };
}
