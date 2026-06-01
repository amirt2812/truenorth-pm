import { Accordion, type QA } from "@/components/ui/Accordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/schema";

/** Reusable FAQ block: renders an accordion + emits FAQPage schema. */
export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  intro,
  tone = "sand",
}: {
  items: QA[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: "sand" | "white" | "navy-soft";
}) {
  return (
    <Section tone={tone}>
      <JsonLd data={faqSchema(items.map((i) => ({ q: i.q, a: i.a })))} />
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
      <div className="mx-auto mt-10 max-w-3xl">
        <Accordion items={items} />
      </div>
    </Section>
  );
}
