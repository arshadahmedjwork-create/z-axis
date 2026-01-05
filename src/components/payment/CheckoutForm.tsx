
import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CheckoutFormProps {
    onSuccess: (paymentIntentId: string) => void;
    amount: string;
}

export const CheckoutForm = ({ onSuccess, amount }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setErrorMessage(error.message ?? "An unknown error occurred");
            setProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            onSuccess(paymentIntent.id);
        } else {
            setErrorMessage("Payment failed or was cancelled.");
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-surface p-4 rounded-lg border border-border">
                <div className="mb-4 text-xl font-bold flex justify-between items-center">
                    <span>Total</span>
                    <span>{amount}</span>
                </div>
                <PaymentElement />
            </div>

            {errorMessage && (
                <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                    {errorMessage}
                </div>
            )}

            <Button
                type="submit"
                disabled={!stripe || processing}
                variant="hero"
                className="w-full"
                size="lg"
            >
                {processing ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    `Pay ${amount}`
                )}
            </Button>
        </form>
    );
};
