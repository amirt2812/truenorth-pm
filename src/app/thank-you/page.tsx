import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Thank You",
  description: "Thanks for reaching out to TrueNorth Property Management.",
  path: "/thank-you",
  noindex: true,
});

const messages: Record<string, { title: string; body: string }> = {
  "rental-analysis": {
    title: "Thank you — your rental analysis request is in.",
    body: "We'll review the property details and follow up with a rental range, management recommendation, and next steps.",
  },
  consultation: {
    title: "Thank you — your consultation request is in.",
    body: "We'll reach out shortly to confirm a time to talk about your property and goals.",
  },
  founding: {
    title: "You're on the Founding Landlord List.",
    body: "Thanks for your interest. We'll be in touch as we open founding owner spots in Hernando County.",
  },
  default: {
    title: "Thank you for reaching out.",
    body: "We've received your message and will follow up as soon as possible.",
  },
};

export default function ThankYouPage({ searchParams }: { searchParams: { type?: string } }) {
  const msg = messages[searchParams.type ?? "default"] ?? messages.default;
  return (
    <section className="bg-sand-100">
      <div className="container-tn flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-700">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-display-md">{msg.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-slate-600">{msg.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary">Back to Home</Button>
          <Button href={site.phoneHref} variant="secondary">
            <Icon name="phone" className="h-4 w-4" /> Call Us
          </Button>
        </div>
      </div>
    </section>
  );
}
