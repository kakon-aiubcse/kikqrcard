import { Seo } from "@/components/seo";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: "Welcome to KIK QR Card. By accessing or using our website or service, you agree to be bound by these Terms and Conditions. Please read them carefully.",
  },
  {
    title: "2. Use of Service",
    body: "You may use KIK QR Card only for lawful purposes. You are responsible for any activity that occurs under your account and for maintaining the confidentiality of your information.",
  },
  {
    title: "3. User Content",
    body: "You retain ownership of your content, but by uploading or creating a card, you grant us permission to display it as part of your profile. You agree not to upload harmful, illegal, or misleading content.",
  },
  {
    title: "4. Privacy",
    body: "Your privacy is important to us. All personal data is handled in accordance with our Privacy Policy. You have full control over what information is shared via your QR Card.",
  },
  {
    title: "5. Modifications",
    body: "We reserve the right to change these terms at any time. Updates will be posted here. Your continued use of the service means you accept any changes.",
  },
  {
    title: "6. Termination",
    body: "We may suspend or terminate access to our service immediately, without prior notice, if you violate any of the terms.",
  },
];

const Tc = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo
        title="Terms and Conditions"
        description="Terms and conditions for using KIK QRcard's digital business card service."
        path="/about/t&c"
      />
      <SiteHeader sectionref={[]} />
      <main className="flex-1 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terms and Conditions.
          </h1>
          <div className="flex flex-col gap-10">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="mb-2 text-xl font-semibold text-foreground">{section.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{section.body}</p>
              </div>
            ))}
            <div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">7. Contact Us</h2>
              <p className="leading-relaxed text-muted-foreground">
                If you have any questions about these Terms, please contact us at{" "}
                <span className="text-primary">kakon.aiubcse@gmail.com</span>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Tc;
