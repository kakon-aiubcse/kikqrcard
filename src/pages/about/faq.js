import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What is a KIK QRcard?",
    a: "It's a digital business card with a dynamic QR code that links to your personalized profile.",
  },
  {
    q: "Do I need to download an app to use it?",
    a: "No app is required. Just scan the QR code with any smartphone camera.",
  },
  {
    q: "Can I edit my card details later?",
    a: "Yes, you can update your profile anytime. Your QR code stays the same.",
  },
  {
    q: "Is my data secure?",
    a: "Yes, your information is securely stored and you control what's visible to others.",
  },
  {
    q: "Can I use it for personal and professional purposes?",
    a: "Absolutely. KIK QRcard is flexible for both business and personal use.",
  },
];

const Faq = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader sectionref={[]} />
      <main className="flex-1 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <Accordion className="w-full">
            {FAQS.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Faq;
