-- Amazon & Flipkart Style Products Seed
-- Copy and paste this into your Supabase SQL Editor

INSERT INTO public.products (name, description, price, image_url, stock, category_id)
SELECT 'Amazon Echo Dot (5th Gen)', 'Smart speaker with Alexa, featuring a sleek design and improved audio for vibrant sound anywhere in your home.', 4499.00, 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80', 120, id FROM public.categories WHERE slug='home'
UNION ALL
SELECT 'boAt Airdopes 141', 'True Wireless Earbuds with 42H Playtime, Low Latency Mode for Gaming, ENx Tech, IWP, IPX4 Water Resistance.', 1299.00, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', 300, id FROM public.categories WHERE slug='accessories'
UNION ALL
SELECT 'Philips Essential Air Fryer', 'Healthy frying with Rapid Air technology. 4.1 Liters capacity, perfect for daily home cooking.', 6999.00, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80', 45, id FROM public.categories WHERE slug='home'
UNION ALL
SELECT 'Levi''s Men''s Solid Regular Fit T-Shirt', '100% Cotton everyday comfort t-shirt. Classic fit with a soft feel, perfect for any casual occasion.', 899.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', 250, id FROM public.categories WHERE slug='apparel'
UNION ALL
SELECT 'Logitech MX Master 3S', 'Advanced Wireless Mouse, Ultra-fast Scrolling, Ergonomic, 8K DPI, Quiet Clicks, Bluetooth, USB-C.', 9495.00, 'https://images.unsplash.com/photo-1615663245857-ac1eeb5304ba?w=800&q=80', 60, id FROM public.categories WHERE slug='objects'
UNION ALL
SELECT 'Mi Smart Band 6', '1.56'' AMOLED Touch Screen, SPO2, Sleep Monitor, 30 Sports Mode, 14 Days Battery Life.', 2499.00, 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&q=80', 150, id FROM public.categories WHERE slug='accessories'
UNION ALL
SELECT 'Pigeon by Stovekraft Electric Kettle', '1.5 Litre electric kettle with a stainless steel body. Perfect for boiling water instantly.', 649.00, 'https://images.unsplash.com/photo-1594247596827-466cc04f21d3?w=800&q=80', 500, id FROM public.categories WHERE slug='home'
UNION ALL
SELECT 'Samsung 27-inch Curved Monitor', '1920 x 1080 FHD resolution, 60Hz refresh rate, AMD FreeSync, and eye saver mode for prolonged usage.', 13500.00, 'https://images.unsplash.com/photo-1527443224154-c4a3d42c3008?w=800&q=80', 25, id FROM public.categories WHERE slug='objects';
