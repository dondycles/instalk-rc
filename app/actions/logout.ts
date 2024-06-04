"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function logOut() {
  const supabase = createClient();
  await supabase.auth.signOut();

  redirect("/login");
}
