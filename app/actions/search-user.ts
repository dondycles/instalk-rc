"use server";

import { createClient } from "@/lib/supabase/server";
export default async function searchUser(search: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("fullname", "%" + search + "%");
  if (error) return { error };
  return { data };
}
