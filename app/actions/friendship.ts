"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const UUID = z.string().uuid({ message: "Not a valid UUID." });

export async function getFriendship(user: z.infer<typeof UUID>) {
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;
  const { data, error } = await supabase
    .from("friendships")
    .select("*")
    .or(
      `and(binds->>receiver.eq.${user},binds->>requester.eq.${currentUser.user?.id}),and(binds->>receiver.eq.${currentUser.user?.id},binds->>requester.eq.${user})`
    )
    .maybeSingle();

  if (error) return { error: error };
  return { data: data };
}

export async function getFriend(friendId: z.infer<typeof UUID>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("id,fullname,username")
    .eq("id", friendId)
    .single();

  if (error) return { error: error };
  return { data: data };
}

export async function getFriends() {
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;
  const newFriendshipList: {
    username: string;
    fullname: string;
    id: z.infer<typeof UUID>;
  }[] = [];

  const { data: friendshipsData, error: friendshipsDataError } = await supabase
    .from("friendships")
    .select("*")
    .or(
      `and(binds->>receiver.eq.${currentUser.user?.id},is_accepted.eq.true),and(is_accepted.eq.true,binds->>requester.eq.${currentUser.user?.id})`
    );

  if (friendshipsDataError) return { error: friendshipsDataError };

  // Use Promise.all to handle async map operations
  await Promise.all(
    friendshipsData.map(async (friendship) => {
      const binds = friendship.binds as {
        receiver: z.infer<typeof UUID>;
        requester: z.infer<typeof UUID>;
      };
      let friendId: string;
      if (binds.receiver === currentUser.user?.id) {
        friendId = binds.requester;
      } else if (binds.requester === currentUser.user?.id) {
        friendId = binds.receiver;
      } else {
        return;
      }

      const { data, error } = await getFriend(friendId);
      if (error || !data) return;

      newFriendshipList.push(data);
    })
  );

  return { data: newFriendshipList };
}

export async function getReceivedRequests() {
  const newFriendshipList: {
    username: string;
    fullname: string;
    id: z.infer<typeof UUID>;
  }[] = [];

  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;
  const { data, error } = await supabase
    .from("friendships")
    .select("*")
    .or(
      `and(binds->>receiver.eq.${currentUser.user?.id},is_accepted.eq.false)`
    );

  if (error) return { error: error };
  await Promise.all(
    data.map(async (friendship) => {
      const binds = friendship.binds as {
        receiver: z.infer<typeof UUID>;
        requester: z.infer<typeof UUID>;
      };
      let friendId: string;
      if (binds.receiver === currentUser.user?.id) {
        friendId = binds.requester;
      } else if (binds.requester === currentUser.user?.id) {
        friendId = binds.receiver;
      } else {
        return;
      }

      const { data, error } = await getFriend(friendId);
      if (error || !data) return;

      newFriendshipList.push(data);
    })
  );

  return { data: newFriendshipList };
}

export async function getSentRequests() {
  const newFriendshipList: {
    username: string;
    fullname: string;
    id: z.infer<typeof UUID>;
  }[] = [];
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;
  const { data, error } = await supabase
    .from("friendships")
    .select("*")
    .or(
      `and(binds->>requester.eq.${currentUser.user?.id},is_accepted.eq.false)`
    );

  if (error) return { error: error };
  await Promise.all(
    data.map(async (friendship) => {
      const binds = friendship.binds as {
        receiver: z.infer<typeof UUID>;
        requester: z.infer<typeof UUID>;
      };
      let friendId: string;
      if (binds.receiver === currentUser.user?.id) {
        friendId = binds.requester;
      } else if (binds.requester === currentUser.user?.id) {
        friendId = binds.receiver;
      } else {
        return;
      }

      const { data, error } = await getFriend(friendId);
      if (error || !data) return;

      newFriendshipList.push(data);
    })
  );

  return { data: newFriendshipList };
}

export async function requestFriendship(user: z.infer<typeof UUID>) {
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;
  //   check first if already requested
  const { data } = await getFriendship(user);
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

export async function acceptFriendship(user: z.infer<typeof UUID>) {
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;
  const { error } = await supabase
    .from("friendships")
    .update({
      is_accepted: true,
    })
    .or(
      `and(binds->>receiver.eq.${user},binds->>requester.eq.${currentUser.user?.id}),and(binds->>receiver.eq.${currentUser.user?.id},binds->>requester.eq.${user})`
    );

  if (error) return { error: error.message };
  return { sucess: "Added!" };
}

export async function deleteFriendship(user: z.infer<typeof UUID>) {
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data;
  const { error } = await supabase
    .from("friendships")
    .delete()
    .or(
      `and(binds->>receiver.eq.${user},binds->>requester.eq.${currentUser.user?.id}),and(binds->>receiver.eq.${currentUser.user?.id},binds->>requester.eq.${user})`
    );
  if (error) return { error: error.message };
  return { sucess: "Friendship delete/canceled!" };
}
