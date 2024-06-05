"use server";

import { createClient } from "@/lib/supabase/server";

export default async function unFriend(user: string) {
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;

  const { error } = await supabase
    .from("friendships")
    .delete()
    .or(
      `and(binds->>receiver.eq.${user},binds->>requester.eq.${currentUser.user?.id}),and(binds->>receiver.eq.${currentUser.user?.id},binds->>requester.eq.${user})`
    );
  if (error) return { error: error.message };
  return { sucess: "Unfriended!" };
}
