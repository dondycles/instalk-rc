"use server";

import { createClient } from "@/lib/supabase/server";

export default async function getFriendship(user: string) {
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;

  const { data, error } = await supabase
    .from("friendships")
    .select("*")
    .or(
      `and(binds->>receiver.eq.${user},binds->>requester.eq.${currentUser.user?.id}),and(binds->>receiver.eq.${currentUser.user?.id},binds->>requester.eq.${user})`
    )
    .maybeSingle();

  console.log(data, error);
  if (error) return { error: error };
  return { data: data };
}
