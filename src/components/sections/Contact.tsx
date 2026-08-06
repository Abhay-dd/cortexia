"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, Mail, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  projectType: z.string().min(1, "Please select a capability"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const CAPABILITIES = [
  "Artificial Intelligence / ML",
  "Intelligent Automation",
  "Software Engineering",
  "Cloud & DevOps Architecture",
  "Executive Advisory",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Contact form submitted:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const input =
    "w-full px-4 py-3.5 rounded-xl bg-[#111D34] border border-white/[0.08] text-white text-sm placeholder:text-[#4F617A] focus:outline-none focus:border-[#E8611A]/50 focus:bg-[#1B2A4A] transition-all duration-200";

  return (
    <section id="contact" className="section bg-[#0C1422]">
      <div className="container">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="label mb-5">Get In Touch</div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold text-white leading-[1.1] mb-5">
              Let&apos;s build something extraordinary together.
            </h2>
            <p className="text-[#8896B0] font-light leading-relaxed mb-10">
              Partner with Cortexia AI to engineer custom intelligence, automate your core workflows, 
              and ship enterprise software that scales.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-[#E8611A]/10 border border-[#E8611A]/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#E8611A]" />
                </div>
                <a href="mailto:hello@cortexia.ai" className="text-[#8896B0] hover:text-white transition-colors">
                  hello@cortexia.ai
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-[#E8611A]/10 border border-[#E8611A]/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#E8611A]" />
                </div>
                <span className="text-[#8896B0]">San Francisco, CA</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="card rounded-2xl p-8">
              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="font-display text-xl font-bold text-white">Message Received</h3>
                  <p className="text-[#8896B0] text-sm font-light">We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-[#4F617A] uppercase tracking-wider mb-2">Name *</label>
                      <input type="text" placeholder="John Doe" className={input} {...register("name")} />
                      {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#4F617A] uppercase tracking-wider mb-2">Email *</label>
                      <input type="email" placeholder="john@company.com" className={input} {...register("email")} />
                      {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#4F617A] uppercase tracking-wider mb-2">Capability Area *</label>
                    <select className={`${input} appearance-none`} defaultValue="" {...register("projectType")}>
                      <option value="" disabled className="bg-[#111D34]">Select a capability</option>
                      {CAPABILITIES.map((c) => (
                        <option key={c} value={c} className="bg-[#111D34] text-white">{c}</option>
                      ))}
                    </select>
                    {errors.projectType && <p className="text-xs text-red-400 mt-1 font-mono">{errors.projectType.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#4F617A] uppercase tracking-wider mb-2">Project Overview *</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your requirements..."
                      className={`${input} resize-none`}
                      {...register("message")}
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-1 font-mono">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : <>Submit Inquiry <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
