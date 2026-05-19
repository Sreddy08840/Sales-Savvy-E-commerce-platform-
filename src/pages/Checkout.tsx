import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { formatINR, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/currency";
import { Smartphone, Truck } from "lucide-react";
import UpiPayment from "@/components/UpiPayment";

const schema = z.object({
  shipping_name: z.string().min(2, "Required").max(100),
  shipping_address: z.string().min(5, "Required").max(200),
  shipping_city: z.string().min(2, "Required").max(80),
  shipping_zip: z.string().min(3, "Required").max(20),
});

type PaymentMethod = "upi" | "cod";

const Checkout = () => {
  const { user } = useAuth();
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [form, setForm] = useState({ shipping_name: "", shipping_address: "", shipping_city: "", shipping_zip: "" });
  const [pendingOrder, setPendingOrder] = useState<{ id: string } | null>(null);
  const [showUpiModal, setShowUpiModal] = useState(false);

  if (!user) { navigate("/auth"); return null; }
  if (items.length === 0 && !showUpiModal) { navigate("/cart"); return null; }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const createOrder = async (status: string) => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return null;
    }

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total,
        status,
        shipping_name: parsed.data.shipping_name,
        shipping_address: parsed.data.shipping_address,
        shipping_city: parsed.data.shipping_city,
        shipping_zip: parsed.data.shipping_zip,
      })
      .select()
      .single();

    if (error || !order) {
      toast.error(error?.message ?? "Could not place order");
      return null;
    }

    const lineItems = items.map((i) => ({
      order_id: order.id,
      product_id: i.product.id,
      product_name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
    }));

    const { error: liErr } = await supabase.from("order_items").insert(lineItems);
    if (liErr) {
      toast.error(liErr.message);
      return null;
    }

    return order;
  };

  const handleUpiFlow = async () => {
    setSubmitting(true);
    const order = await createOrder("awaiting_payment");
    if (!order) { setSubmitting(false); return; }
    setPendingOrder(order);
    setShowUpiModal(true);
    setSubmitting(false);
  };

  const handleUpiPaymentComplete = async () => {
    if (!pendingOrder) return;
    // Mark order as paid
    await supabase
      .from("orders")
      .update({ status: "paid" })
      .eq("id", pendingOrder.id);
    await clear();
    toast.success("Payment received — Order placed! 🎉");
    navigate(`/account?order=${pendingOrder.id}`);
  };

  const handleUpiCancel = async () => {
    if (pendingOrder) {
      // Mark as cancelled
      await supabase
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", pendingOrder.id);
    }
    setShowUpiModal(false);
    setPendingOrder(null);
    toast.info("Payment cancelled");
  };

  const handleCOD = async () => {
    setSubmitting(true);
    const order = await createOrder("pending");
    if (!order) { setSubmitting(false); return; }
    await clear();
    toast.success("Order placed — Cash on Delivery 🚚");
    navigate(`/account?order=${order.id}`);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "upi") {
      await handleUpiFlow();
    } else {
      await handleCOD();
    }
  };

  return (
    <>
      {/* UPI Payment Modal */}
      {showUpiModal && pendingOrder && (
        <UpiPayment
          amount={total}
          orderId={pendingOrder.id}
          onPaymentComplete={handleUpiPaymentComplete}
          onCancel={handleUpiCancel}
        />
      )}

      <div className="container py-12 md:py-16 max-w-5xl">
        <h1 className="font-display text-5xl md:text-6xl mb-12">Checkout</h1>
        <form onSubmit={submit} className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7 space-y-8">
            {/* Shipping Address */}
            <section className="space-y-6">
              <h2 className="eyebrow mb-2">Shipping address</h2>
              <div>
                <Label htmlFor="name" className="eyebrow text-muted-foreground">Full name</Label>
                <Input id="name" value={form.shipping_name} onChange={(e) => setForm({ ...form, shipping_name: e.target.value })} className="rounded-none border-x-0 border-t-0 border-b px-0 mt-2 focus-visible:ring-0" />
              </div>
              <div>
                <Label htmlFor="address" className="eyebrow text-muted-foreground">Street address</Label>
                <Input id="address" value={form.shipping_address} onChange={(e) => setForm({ ...form, shipping_address: e.target.value })} className="rounded-none border-x-0 border-t-0 border-b px-0 mt-2 focus-visible:ring-0" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city" className="eyebrow text-muted-foreground">City</Label>
                  <Input id="city" value={form.shipping_city} onChange={(e) => setForm({ ...form, shipping_city: e.target.value })} className="rounded-none border-x-0 border-t-0 border-b px-0 mt-2 focus-visible:ring-0" />
                </div>
                <div>
                  <Label htmlFor="zip" className="eyebrow text-muted-foreground">PIN code</Label>
                  <Input id="zip" value={form.shipping_zip} onChange={(e) => setForm({ ...form, shipping_zip: e.target.value })} className="rounded-none border-x-0 border-t-0 border-b px-0 mt-2 focus-visible:ring-0" />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="space-y-4">
              <h2 className="eyebrow mb-2">Payment method</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-5 border-2 text-left transition-all duration-200 ${
                    paymentMethod === "upi"
                      ? "border-ink bg-ink/5"
                      : "border-border hover:border-ink/30"
                  }`}
                >
                  <Smartphone className="h-5 w-5 mb-3" />
                  <div className="font-display text-lg">Pay via UPI</div>
                  <p className="text-xs text-muted-foreground mt-1">GPay · PhonePe · Paytm · Any UPI app</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-5 border-2 text-left transition-all duration-200 ${
                    paymentMethod === "cod"
                      ? "border-ink bg-ink/5"
                      : "border-border hover:border-ink/30"
                  }`}
                >
                  <Truck className="h-5 w-5 mb-3" />
                  <div className="font-display text-lg">Cash on Delivery</div>
                  <p className="text-xs text-muted-foreground mt-1">Pay when your order arrives</p>
                </button>
              </div>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="md:col-span-5 bg-bone p-8 self-start">
            <h2 className="eyebrow mb-6">Your order</h2>
            <div className="space-y-3 pb-6 border-b border-border">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span>{i.product.name} × {i.quantity}</span>
                  <span className="tabular-nums">{formatINR(Number(i.product.price) * i.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 py-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">{formatINR(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="tabular-nums">{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
            </div>
            <div className="flex justify-between items-baseline py-4 mb-6 border-t border-border">
              <span className="eyebrow">Total</span>
              <span className="font-display text-3xl tabular-nums">{formatINR(total)}</span>
            </div>
            <Button type="submit" disabled={submitting} className="w-full rounded-none h-12 eyebrow">
              {submitting
                ? "Processing…"
                : paymentMethod === "upi"
                  ? `Pay ${formatINR(total)} via UPI`
                  : "Place order — COD"}
            </Button>
            {paymentMethod === "upi" && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                You'll be redirected to your UPI app
              </p>
            )}
          </aside>
        </form>
      </div>
    </>
  );
};

export default Checkout;
