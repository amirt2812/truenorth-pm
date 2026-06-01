import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="bg-sand-100">
      <div className="container-tn flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <Icon name="compass" className="h-12 w-12 text-gold-500" />
        <p className="mt-4 font-display text-6xl font-semibold text-navy-800">404</p>
        <h1 className="mt-2 text-display-md">This page is off the map.</h1>
        <p className="mt-3 max-w-md text-lg text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
          on course.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary">Back to Home</Button>
          <Button href="/free-rental-analysis" variant="gold">Get a Free Rental Analysis</Button>
        </div>
      </div>
    </section>
  );
}
