"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, CheckCircle2, Mail, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please select a capability"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  "Artificial Intelligence / ML",
  "Workflow Automation",
  "Software Development",
  "Cloud & DevOps Architecture",
  "Executive Advisory",
];

const budgetRanges = [
  "$10,000 - $25,000",
  "$25,000 - $75,000",
  "$75,000 - $150,000",
  "$150,000+",
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
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Submitted:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 6000);
  };

  const inputStyle =
    "w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:bg-white/[0.05] transition-all";

  return (
    <section id="contact" className="relative py-36 bg-[#030611] overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Index Marker */}
        <motion.div
          className="flex items-center gap-4 mb-16 text-xs font-mono text-blue-400 tracking-widest uppercase"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span>06</span>
          <span className="w-8 h-px bg-blue-500/40" />
          <span>INITIATE DIALOGUE</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Editorial Headline & Details */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.02]">
              Let&apos;s build the future together.
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Partner with Cortexia AI to engineer custom intelligence, automate core workflows, 
              and build scalable digital products.
            </p>

            <div className="space-y-4 pt-6 border-t border-white/10 text-sm font-mono text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{COMPANY.address}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative">
              {isSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                  <h3 className="font-display text-2xl font-bold text-white">Message Transmitted</h3>
                  <p className="text-slate-400 text-sm font-light">Our engineering team will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        NAME *
                      </label>
                      <input type="text" placeholder="John Doe" className={inputStyle} {...register("name")} />
                      {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        EMAIL *
                      </label>
                      <input type="email" placeholder="john@company.com" className={inputStyle} {...register("email")} />
                      {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        COMPANY
                      </label>
                      <input type="text" placeholder="Acme Inc" className={inputStyle} {...register("company")} />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        CAPABILITY AREA *
                      </label>
                      <select className={`${inputStyle} appearance-none`} {...register("projectType")} defaultValue="">
                        <option value="" disabled className="bg-[#0b1120]">Select Capability</option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t} className="bg-[#0b1120] text-white">{t}</option>
                        ))}
                      </select>
                      {errors.projectType && <p className="text-xs text-red-400 mt-1 font-mono">{errors.projectType.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      PROJECT SCOPE & OBJECTIVE *
                    </label>
                    <textarea rows={4} placeholder="Describe your technical requirements..." className={`${inputStyle} resize-none`} {...register("message")} />
                    {errors.message && <p className="text-xs text-red-400 mt-1 font-mono">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-2xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="font-mono text-xs animate-pulse">TRANSMITTING...</span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
