import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Valentine {
  id: string;
  short_id: string;
  recipient_name: string;
  sender_name: string | null;
  gender: "male" | "female";
  created_at: string;
  no_count: number;
  yes_count: number;
  accepted_at: string | null;
  success_viewed_at: string | null;
}
