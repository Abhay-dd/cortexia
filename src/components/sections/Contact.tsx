"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  MapPin,
  Mail,
  CheckCircle,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientOrb from "@/components/effects/GradientOrb";
import { COMPANY } from "@/lib/constants";

// Brand icons (not available in lucide-react)
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg>
);

const MailIcon = Mail;

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  "AI / Machine Learning",
  "Automation",
  "Software Development",
  "Cloud & DevOps",
  "Consulting",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
];

const socialLinks = [
  { icon: LinkedinIcon, href: "https://linkedin.com/company/cortexia-ai", label: "LinkedIn" },
  { icon: GithubIcon, href: "https://github.com/cortexia-ai", label: "GitHub" },
  { icon: InstagramIcon, href: "https://instagram.com/cortexia.ai", label: "Instagram" },
  { icon: MailIcon, href: "mailto:hello@cortexia.ai", label: "Email" },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200";

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <GradientOrb
        className="-bottom-40 -right-40 z-0"
        color1="rgba(37,99,235,0.08)"
        color2="rgba(6,182,212,0.04)"
        size={500}
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's Build Something Extraordinary Together."
        />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 sm:p-8">
              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-16 h-16 text-emerald-400 mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className={inputClasses}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        className={inputClasses}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Your Company"
                        className={inputClasses}
                        {...register("company")}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className={inputClasses}
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                        Project Type <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="projectType"
                        className={`${inputClasses} appearance-none`}
                        {...register("projectType")}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a type
                        </option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t} className="bg-card text-foreground">
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p className="mt-1 text-xs text-red-400">{errors.projectType.message}</p>
                      )}
                    </div>

                    {/* Budget */}
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2">
                        Budget
                      </label>
                      <select
                        id="budget"
                        className={`${inputClasses} appearance-none`}
                        {...register("budget")}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select budget range
                        </option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b} className="bg-card text-foreground">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your project..."
                      className={`${inputClasses} resize-none`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* CTA */}
              <div>
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Let&apos;s Build Something{" "}
                  <span className="gradient-text">Extraordinary</span> Together.
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Whether you&apos;re looking to integrate AI into your business, automate workflows,
                  or build a scalable platform, we&apos;re here to help.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-foreground transition-colors">
                    {COMPANY.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{COMPANY.address}</span>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative rounded-xl border border-border bg-card/30 h-48 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                    <p className="text-xs text-muted">San Francisco, CA</p>
                  </div>
                </div>
                {/* Grid overlay for map feel */}
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-heading text-sm font-semibold mb-4 text-muted uppercase tracking-wider">
                  Connect With Us
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                      aria-label={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
