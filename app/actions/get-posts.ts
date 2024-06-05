"use server";

import { createClient } from "@/lib/supabase/server";

export default async function getPosts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*,users(username,fullname) ,post_likes(*, users(username,fullname)), post_comments(*, users(username, fullname))"
    )
    .order("created_at", {
      ascending: false,
    })
    .order("created_at", { referencedTable: "post_comments", ascending: false })
    .limit(4, { referencedTable: "post_comments" });
  console.log(error);
  if (error) return { error: error };
  return { data: data };
}
