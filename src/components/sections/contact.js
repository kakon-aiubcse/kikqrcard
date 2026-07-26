import { forwardRef, useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/profile.php?id=61578126735116", icon: "/facebook.svg", label: "Facebook" },
  { href: "https://wa.me/8801923089370", icon: "/wp.svg", label: "WhatsApp" },
  { href: "https://rb.gy/6t2at1", icon: "/linkedin.svg", label: "LinkedIn" },
];

const Contact = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 201) {
        toast.success("Submitted successfully");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else if (response.ok) {
        toast.success("Message sent successfully.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send message.");
        console.error(result);
      }
    } catch (error) {
      toast.error("Failed to send message.");
      console.error(error);
    }
  };

  return (
    <section ref={ref} id="contact" className="w-full py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            We&apos;re always here to hear you.
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">01923089370</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">kakon.aiubcse@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Location</p>
                <p className="text-sm text-muted-foreground">Dhaka, Bangladesh.</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <img src={social.icon} className="size-5" alt={social.label} />
                </a>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" name="name" onChange={handleChange} value={formData.name} placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" name="email" type="email" onChange={handleChange} value={formData.email} placeholder="you@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-phone">Phone Number</Label>
                  <Input id="contact-phone" name="phone" onChange={handleChange} value={formData.phone} placeholder="Phone number" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-message">Your Query</Label>
                  <textarea
                    id="contact-message"
                    name="message"
                    onChange={handleChange}
                    value={formData.message}
                    placeholder="How can we help?"
                    rows={4}
                    className="flex w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                  />
                </div>
                <Button type="submit" className="mt-2">
                  Send message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
