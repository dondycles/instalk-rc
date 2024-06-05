"use server";

import { createClient } from "@/lib/supabase/server";

export default async function getFriendship(user: string, checking?: boolean) {
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;

  if (checking) {
    const { data, error } = await supabase
      .from("friendships")
      .select("id")
      .or(
        `and(binds->>receiver.eq.${user},binds->>requester.eq.${currentUser.user?.id}),and(binds->>receiver.eq.${currentUser.user?.id},binds->>requester.eq.${user})`
      )
      .single();

    if (error) return { error: error };
    return { data: data };
  }

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
