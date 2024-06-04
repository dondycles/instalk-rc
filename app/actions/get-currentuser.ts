"use server";

import { createClient } from "@/lib/supabase/server";

export default async function getCurrentUser() {
  const supabase = createClient();
  const currentUserId = (await supabase.auth.getUser()).data.user?.id;

  if (!currentUserId) return;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", currentUserId)
    .single();
  if (error) return { error };
  return { data };
}
