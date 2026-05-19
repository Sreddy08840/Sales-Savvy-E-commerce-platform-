import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env", "utf8");
const urlMatch = env.match(/VITE_SUPABASE_URL="(.*?)"/);
const keyMatch = env.match(/VITE_SUPABASE_PUBLISHABLE_KEY="(.*?)"/);

const supabase = createClient(urlMatch[1], keyMatch[1]);

async function checkCategories() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) console.error("Error:", error);
  else console.log("Categories:", JSON.stringify(data, null, 2));
}

checkCategories();
