import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Product, Category } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [params, setParams] = useSearchParams();
  const slug = params.get("category");

  useEffect(() => {
    supabase.from("categories").select("*").order("name").then(({ data }) => {
      setCategories((data as Category[]) ?? []);
    });
  }, []);

  useEffect(() => {
    let q = supabase.from("products").select("*").order("name");
    const cat = categories.find((c) => c.slug === slug);
    if (cat) q = q.eq("category_id", cat.id);
    q.then(({ data }) => setProducts((data as Product[]) ?? []));
  }, [slug, categories]);

  const active = slug ?? "all";

  return (
    <div className="container py-16 md:py-24">
      <header className="mb-16 max-w-2xl">
        <span className="eyebrow text-terracotta mb-4 block">The catalog</span>
        <h1 className="font-display text-5xl md:text-6xl leading-tight">
          {slug ? categories.find(c => c.slug === slug)?.name ?? "Shop" : "Everything we make"}
        </h1>
      </header>

      <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-border pb-6 mb-12">
        <button
          onClick={() => setParams({})}
          className={`eyebrow transition-colors ${active === "all" ? "text-ink" : "text-muted-foreground hover:text-ink"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setParams({ category: c.slug })}
            className={`eyebrow transition-colors ${active === c.slug ? "text-ink" : "text-muted-foreground hover:text-ink"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-muted-foreground">Nothing here yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Shop;
