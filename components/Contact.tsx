"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Copy } from "lucide-react";

const Contact = () => {
  const email = "eeli56315@gmail.com";
  const phone = "+963 947 089 514";

  const form = useRef<HTMLFormElement | null>(null);
  const [copied, setCopied] = useState(false);

  const copyText = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        "service_9rz0l59",
        "template_kcwnu4i",
        form.current,
        "tDVr_CCKVaeH3p2aL",
      )
      .then(() => {
        alert("Message sent successfully!");
        form.current?.reset();
      });
  };

  return (
    <section id="contact" className="relative py-8 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project, an idea, or just want to say hello? I’m always open
            to new opportunities.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                Feel free to contact me anytime. I’ll get back to you as soon as
                possible.
              </p>
            </div>

            {/* Email */}
            <div
              onClick={() => copyText(email)}
              className="relative flex items-center gap-4 p-4 rounded-xl border border-border bg-background/60 hover:bg-background transition cursor-pointer"
            >
              <i className="bx bxs-envelope text-2xl text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{email}</p>
                <Copy className="absolute top-7 right-4 opacity-30" />
              </div>
            </div>

            {/* Phone */}
            <div
              onClick={() => copyText(phone)}
              className="relative flex items-center gap-4 p-4 rounded-xl border border-border bg-background/60 hover:bg-background transition cursor-pointer"
            >
              <i className="bx bxs-phone text-2xl text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold">{phone}</p>{" "}
                <Copy className="absolute top-7 right-4 opacity-30" />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-background/80 backdrop-blur p-8 shadow-lg">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
                className="w-full rounded-xl bg-transparent border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
                className="w-full rounded-xl bg-transparent border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                required
                className="w-full rounded-xl bg-transparent border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-primary text-primary-foreground py-3 font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-6 right-6 px-4 py-2 rounded-xl bg-green-600 text-white text-sm shadow-lg transition-all duration-300 ${
          copied
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        Copied to clipboard
      </div>
    </section>
  );
};

export default Contact;
