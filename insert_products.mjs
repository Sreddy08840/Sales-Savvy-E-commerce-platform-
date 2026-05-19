import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env", "utf8");
const urlMatch = env.match(/VITE_SUPABASE_URL="(.*?)"/);
const keyMatch = env.match(/VITE_SUPABASE_PUBLISHABLE_KEY="(.*?)"/);

const supabase = createClient(urlMatch[1], keyMatch[1]);

const CATEGORIES = {
  apparel: "b0eba391-5016-460a-b2a4-79c4ad0a345c",
  accessories: "3411b286-3d8c-462b-b8a2-55935a4e201d",
  home: "99c4cbb2-6116-42d5-a964-846ce3848e51",
  objects: "c2c1d456-c8cf-480f-982c-b3fa02e00bc9"
};

const newProducts = [
  {
    name: "Amazon Echo Dot (5th Gen)",
    description: "Smart speaker with Alexa, featuring a sleek design and improved audio for vibrant sound anywhere in your home.",
    price: 4499,
    stock: 120,
    category_id: CATEGORIES.home,
    image_url: "https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "boAt Airdopes 141",
    description: "True Wireless Earbuds with 42H Playtime, Low Latency Mode for Gaming, ENx Tech, IWP, IPX4 Water Resistance.",
    price: 1299,
    stock: 300,
    category_id: CATEGORIES.accessories,
    image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Philips Essential Air Fryer",
    description: "Healthy frying with Rapid Air technology. 4.1 Liters capacity, perfect for daily home cooking.",
    price: 6999,
    stock: 45,
    category_id: CATEGORIES.home,
    image_url: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Levi's Men's Solid Regular Fit T-Shirt",
    description: "100% Cotton everyday comfort t-shirt. Classic fit with a soft feel, perfect for any casual occasion.",
    price: 899,
    stock: 250,
    category_id: CATEGORIES.apparel,
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Logitech MX Master 3S",
    description: "Advanced Wireless Mouse, Ultra-fast Scrolling, Ergonomic, 8K DPI, Quiet Clicks, Bluetooth, USB-C.",
    price: 9495,
    stock: 60,
    category_id: CATEGORIES.objects,
    image_url: "https://images.unsplash.com/photo-1615663245857-ac1eeb5304ba?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Mi Smart Band 6",
    description: "1.56'' AMOLED Touch Screen, SPO2, Sleep Monitor, 30 Sports Mode, 14 Days Battery Life.",
    price: 2499,
    stock: 150,
    category_id: CATEGORIES.accessories,
    image_url: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Pigeon by Stovekraft Electric Kettle",
    description: "1.5 Litre electric kettle with a stainless steel body. Perfect for boiling water instantly.",
    price: 649,
    stock: 500,
    category_id: CATEGORIES.home,
    image_url: "https://images.unsplash.com/photo-1594247596827-466cc04f21d3?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Samsung 27-inch Curved Monitor",
    description: "1920 x 1080 FHD resolution, 60Hz refresh rate, AMD FreeSync, and eye saver mode for prolonged usage.",
    price: 13500,
    stock: 25,
    category_id: CATEGORIES.objects,
    image_url: "https://images.unsplash.com/photo-1527443224154-c4a3d42c3008?q=80&w=600&auto=format&fit=crop"
  }
];

async function insertProducts() {
  const { data, error } = await supabase.from("products").insert(newProducts).select();
  if (error) {
    console.error("Error inserting products:", error);
  } else {
    console.log(`Successfully added ${data.length} products.`);
  }
}

insertProducts();
