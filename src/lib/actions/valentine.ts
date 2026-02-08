"use server";

import { nanoid } from "nanoid";
import { supabase, type Valentine } from "@/lib/supabase";

export async function createValentine(data: {
  recipientName: string;
  senderName?: string;
  gender: "male" | "female";
}): Promise<{ shortId: string } | { error: string }> {
  const shortId = nanoid(7);

  const { error } = await supabase.from("valentines").insert({
    short_id: shortId,
    recipient_name: data.recipientName,
    sender_name: data.senderName || null,
    gender: data.gender,
  });

  if (error) {
    console.error("Failed to create valentine:", error);
    return { error: "Failed to create valentine" };
  }

  return { shortId };
}

export async function getValentine(shortId: string): Promise<Valentine | null> {
  const { data, error } = await supabase
    .from("valentines")
    .select("*")
    .eq("short_id", shortId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Valentine;
}

export async function trackNoClick(shortId: string): Promise<void> {
  const { data } = await supabase
    .from("valentines")
    .select("no_count")
    .eq("short_id", shortId)
    .single();

  if (data) {
    await supabase
      .from("valentines")
      .update({ no_count: (data.no_count || 0) + 1 })
      .eq("short_id", shortId);
  }
}

export async function trackYesClick(shortId: string): Promise<void> {
  const { data } = await supabase
    .from("valentines")
    .select("accepted_at, yes_count")
    .eq("short_id", shortId)
    .single();

  if (data && !data.accepted_at) {
    await supabase
      .from("valentines")
      .update({
        yes_count: 1,
        accepted_at: new Date().toISOString(),
      })
      .eq("short_id", shortId);
  } else if (data) {
    await supabase
      .from("valentines")
      .update({ yes_count: (data.yes_count ?? 0) + 1 })
      .eq("short_id", shortId);
  }
}

export async function trackSuccessView(shortId: string): Promise<void> {
  const { data } = await supabase
    .from("valentines")
    .select("success_viewed_at")
    .eq("short_id", shortId)
    .single();

  if (data && !data.success_viewed_at) {
    await supabase
      .from("valentines")
      .update({
        success_viewed_at: new Date().toISOString(),
      })
      .eq("short_id", shortId);
  }
}
