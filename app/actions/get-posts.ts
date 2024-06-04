"use server";

import { createClient } from "@/lib/supabase/server";

export default async function getPosts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*,users(username,fullname) ,post_likes(*, users(username,fullname))"
    );

  if (error) return { error: error };
  return { data: data };
}
