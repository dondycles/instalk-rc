"use server";

import { createClient } from "@/lib/supabase/server";
import getFriendship from "./get-friendship";

export default async function addFriend(user: string) {
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;

  //   check first if already requested
  const { data } = await getFriendship(user, true);
  if (data?.id) return { sucess: "Added!" };

  const { error } = await supabase.from("friendships").insert({
    binds: {
      requester: currentUser.user?.id,
      receiver: user,
    },
  });
  if (error) return { error: error.message };
  return { sucess: "Added!" };
}
