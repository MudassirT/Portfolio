import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@mudassirahmed.dev",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/mudassirahmed",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Karachi, Pakistan",
  },
];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Message sending failed.");
      }

      toast.success("Message sent! I'll reach out shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            05 — Contact
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl">Together</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="glass rounded-3xl p-6 border border-border/60 flex items-center gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-sm break-all">{item.value}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass rounded-3xl p-6 border border-border/60"
          >
            <div className="space-y-4">
              <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </label>

              <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Email
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </label>

              <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Message
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </label>

              <button
                type="submit"
                disabled={isSending}
                className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl gradient-bg text-primary-foreground font-medium hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="border-t border-border/40 py-8">
    <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Mudassir Ahmed. Crafted with ✦ React & AI.</p>
      <p className="font-mono text-xs">Built with MERN · Tailwind · Framer Motion</p>
    </div>
  </footer>
);
