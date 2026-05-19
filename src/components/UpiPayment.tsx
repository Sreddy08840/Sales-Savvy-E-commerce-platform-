import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/currency";
import { CheckCircle, Smartphone, QrCode, Loader2 } from "lucide-react";

const UPI_ID = "sujalgupta352-2@oksbi";
const MERCHANT_NAME = "Sales Savvy";

interface UpiPaymentProps {
  amount: number;
  orderId: string;
  onPaymentComplete: () => void;
  onCancel: () => void;
}

const UpiPayment = ({ amount, orderId, onPaymentComplete, onCancel }: UpiPaymentProps) => {
  const [step, setStep] = useState<"pay" | "confirming" | "done">("pay");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  // Build the UPI deep-link URL
  const txnNote = `Order ${orderId.slice(0, 8)}`;
  const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(txnNote)}`;

  const handleOpenUpi = () => {
    window.location.href = upiUrl;
  };

  const handleConfirm = () => {
    setStep("confirming");
    // Simulate a brief confirmation delay
    setTimeout(() => {
      setStep("done");
      setTimeout(() => onPaymentComplete(), 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white max-w-md w-full p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 mb-4">
            {step === "done" ? (
              <CheckCircle className="h-7 w-7 text-emerald-600" />
            ) : (
              <QrCode className="h-7 w-7 text-ink" />
            )}
          </div>
          <h2 className="font-display text-3xl">
            {step === "done" ? "Payment received!" : "Pay via UPI"}
          </h2>
          <p className="text-muted-foreground mt-2">
            {step === "done"
              ? "Your order is being placed…"
              : `Pay ${formatINR(amount)} to complete your order`}
          </p>
        </div>

        {step === "done" ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        ) : step === "confirming" ? (
          <div className="flex flex-col items-center py-6 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-ink" />
            <p className="text-sm text-muted-foreground">Confirming payment…</p>
          </div>
        ) : (
          <>
            {/* QR Code — visible on both desktop & mobile */}
            <div className="flex flex-col items-center mb-6">
              <div className="border-2 border-border p-4 bg-white">
                <QRCodeSVG
                  value={upiUrl}
                  size={200}
                  level="H"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#1a1a1a"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Scan with any UPI app — GPay, PhonePe, Paytm, etc.
              </p>
            </div>

            {/* Amount & UPI ID */}
            <div className="bg-bone p-4 mb-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-display text-lg tabular-nums">{formatINR(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">UPI ID</span>
                <span className="font-mono text-xs">{UPI_ID}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order</span>
                <span className="font-mono text-xs">#{orderId.slice(0, 8)}</span>
              </div>
            </div>

            {/* Mobile: open UPI app directly */}
            {isMobile && (
              <Button
                onClick={handleOpenUpi}
                className="w-full rounded-none h-12 eyebrow mb-3 bg-emerald-600 hover:bg-emerald-700"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Open UPI App to Pay
              </Button>
            )}

            {/* Confirm button */}
            <Button
              onClick={handleConfirm}
              className="w-full rounded-none h-12 eyebrow"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              I've completed the payment
            </Button>

            <button
              onClick={onCancel}
              className="w-full text-center text-sm text-muted-foreground hover:text-ink mt-4 py-2 transition-colors"
            >
              Cancel payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpiPayment;
