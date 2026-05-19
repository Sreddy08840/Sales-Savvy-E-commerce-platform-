import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatINR, FREE_SHIPPING_THRESHOLD } from "@/lib/currency";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  useEffect(() => {
    if (!id) return;
    supabase.from("products").select("*").eq("id", id).maybeSingle().then(({ data }) => {
      setProduct(data as Product | null);
    });
  }, [id]);

  if (!product) return <div className="container py-24 text-muted-foreground">Loading…</div>;

  return (
    <div className="container py-12 md:py-16">
      <Link to="/shop" className="eyebrow text-muted-foreground hover:text-ink mb-8 inline-block">← Back to shop</Link>
      <div className="grid md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-7 bg-bone aspect-[4/5] overflow-hidden">
          {product.image_url && (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="md:col-span-5 md:pt-8">
          <span className="eyebrow text-terracotta mb-4 block">In stock</span>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">{product.name}</h1>
          <p className="font-display text-2xl mb-8">{formatINR(Number(product.price))}</p>
          <p className="text-muted-foreground leading-relaxed mb-10">{product.description}</p>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-bone">−</button>
              <span className="px-4 tabular-nums">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-bone">+</button>
            </div>
            <span className="text-sm text-muted-foreground">{product.stock} available</span>
          </div>

          <Button onClick={() => add(product.id, qty)} size="lg" className="rounded-none w-full h-14 eyebrow">
            Add to cart — {formatINR(Number(product.price) * qty)}
          </Button>

          <div className="mt-12 pt-8 border-t border-border space-y-4 text-sm text-muted-foreground">
            <div className="flex justify-between"><span>Shipping</span><span>Free over {formatINR(FREE_SHIPPING_THRESHOLD, 0)}</span></div>
            <div className="flex justify-between"><span>Returns</span><span>30 days</span></div>
            <div className="flex justify-between"><span>Origin</span><span>Made to order</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
