import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase.from("products").select("*").limit(4).then(({ data }) => {
      setProducts((data as Product[]) ?? []);
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="grid md:grid-cols-12 gap-0">
          <div className="md:col-span-5 flex flex-col justify-center px-6 md:px-12 py-16 md:py-32 order-2 md:order-1">
            <span className="eyebrow text-terracotta mb-6">Volume 01 — Autumn Edit</span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-8 text-balance">
              Objects worth<br/>
              <em className="text-terracotta">keeping</em>.
            </h1>
            <p className="text-muted-foreground max-w-md mb-10 leading-relaxed">
              A small collection of slow-made apparel, home goods, and quiet objects — chosen for character, made to outlast trend.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="rounded-none px-8 h-12 eyebrow">
                <Link to="/shop">Shop the edit</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-none px-8 h-12 eyebrow">
                <Link to="/shop">Read journal</Link>
              </Button>
            </div>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 grain">
            <img src={hero} alt="Editorial still life with ceramic vase, brass and linen" width={1080} height={1920} className="w-full h-[60vh] md:h-[88vh] object-cover" />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="eyebrow text-muted-foreground mb-3">Currently</div>
            <h2 className="font-display text-4xl md:text-5xl">New arrivals</h2>
          </div>
          <Link to="/shop" className="eyebrow text-muted-foreground hover:text-ink hidden md:inline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Editorial split */}
      <section className="bg-bone py-24 md:py-32">
        <div className="container grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <img src={editorial2} alt="Stack of cashmere knitwear in cream and terracotta" loading="lazy" width={1200} height={1500} className="w-full h-auto" />
          <div className="max-w-md">
            <span className="eyebrow text-terracotta mb-6 block">A note on materials</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
              Cloth that <em>remembers</em> the hand that made it.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Every fiber in our knitwear is sourced within a 200-mile radius of the mill. We work directly with the makers — no intermediaries, no compromises on color, weight, or finish.
            </p>
            <Link to="/shop?category=apparel" className="eyebrow border-b border-ink pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
              Discover apparel
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial wide */}
      <section className="container py-24 md:py-32 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 md:col-start-1 max-w-md">
          <span className="eyebrow text-terracotta mb-6 block">Field notes</span>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
            For the long, slow walk home.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our autumn capsule is built around weight and warmth — heavy linens, brushed wool, and a few quiet pieces that only get better with time and wear.
          </p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <img src={editorial1} alt="Model wearing oversized linen overshirt in golden hour light" loading="lazy" width={1200} height={1500} className="w-full h-auto grain" />
        </div>
      </section>
    </>
  );
};

export default Index;
