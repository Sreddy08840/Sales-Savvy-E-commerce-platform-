import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

async function checkCategories() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) console.error("Error:", error);
  else console.log("Categories:", data);
}

checkCategories();
