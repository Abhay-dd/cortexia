"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, Clock, MessageSquare, Zap } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  challenge: z.string().min(20, "Tell us more — at least 20 characters"),
  budget: z.string().min(1, "Please select a budget range"),
});

type FormData = z.infer<typeof schema>;

const BUDGETS = [
  "Under $10K",
  "$10K – $30K",
  "$30K – $100K",
  "$100K+",
  "Not sure yet",
];

const PROMISES = [
  { icon: Clock, text: "Reply within 24 hours — usually same day" },
  { icon: MessageSquare, text: "Free 60-min technical discovery call" },
  { icon: Zap, text: "Actionable proposal, not a sales pitch" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1000));
    console.log("Contact:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  const input = "w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder:text-[#4F617A] focus:outline-none transition-all duration-200 font-light"
    + " bg-[#0B1525] border border-white/[0.08] focus:border-[#E8611A]/50 focus:bg-[#0F1D30]";

  return (
    <section id="contact" className="section" style={{ background: "#070E1A" }}>
      <div className="container">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — Founder voice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="label mb-5">Start Here</div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold text-white leading-[1.1] mb-6">
              Let&apos;s talk about what AI can do for your business.
            </h2>

            <p className="text-[#8896B0] font-light leading-relaxed mb-4 text-base">
              I started Cortexia AI because I kept seeing great businesses held back by bad software and zero automation.
            </p>
            <p className="text-[#8896B0] font-light leading-relaxed mb-10 text-base">
              Tell us your biggest operational challenge and we&apos;ll show you exactly how we&apos;d solve it with AI.
              No generic proposals. No wasted meetings.
            </p>

            {/* Promises */}
            <div className="space-y-4 mb-10">
              {PROMISES.map((p) => (
                <div key={p.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(232,97,26,0.1)", border: "1px solid rgba(232,97,26,0.2)" }}>
                    <p.icon className="w-4 h-4 text-[#E8611A]" />
                  </div>
                  <span className="text-sm text-[#8896B0] font-light">{p.text}</span>
                </div>
              ))}
            </div>

            {/* Social proof note */}
            <div className="p-5 rounded-2xl" style={{ background: "rgba(232,97,26,0.06)", border: "1px solid rgba(232,97,26,0.15)" }}>
              <div className="text-xs font-mono text-[#E8611A] uppercase tracking-widest mb-2">Recent client result</div>
              <p className="text-sm text-white font-medium mb-1">
                &quot;Cortexia automated 3 full-time roles in 6 weeks. ROI in month 2.&quot;
              </p>
              <p className="text-xs text-[#4F617A]">— COO, Logistics Company (Dubai)</p>
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="card rounded-2xl p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto" />
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-white">Message Received.</h3>
                  <p className="text-[#8896B0] text-sm font-light max-w-xs mx-auto">
                    We&apos;ll personally review your challenge and reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#4F617A] uppercase tracking-widest mb-2">Your Name *</label>
                      <input type="text" placeholder="Alex Johnson" className={input} {...register("name")} />
                      {errors.name && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#4F617A] uppercase tracking-widest mb-2">Work Email *</label>
                      <input type="email" placeholder="alex@company.com" className={input} {...register("email")} />
                      {errors.email && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#4F617A] uppercase tracking-widest mb-2">Company (Optional)</label>
                    <input type="text" placeholder="Acme Corp" className={input} {...register("company")} />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#4F617A] uppercase tracking-widest mb-2">What&apos;s your biggest challenge? *</label>
                    <textarea rows={4} placeholder="Tell us what problem you're trying to solve. Be specific — the more detail, the better our response." className={`${input} resize-none`} {...register("challenge")} />
                    {errors.challenge && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.challenge.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#4F617A] uppercase tracking-widest mb-2">Budget Range *</label>
                    <select className={`${input} appearance-none`} defaultValue="" {...register("budget")}>
                      <option value="" disabled className="bg-[#0B1525]">Select range</option>
                      {BUDGETS.map(b => <option key={b} value={b} className="bg-[#0B1525] text-white">{b}</option>)}
                    </select>
                    {errors.budget && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.budget.message}</p>}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-50 text-sm py-4">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                    ) : (
                      <>Get My Free Technical Consultation <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-[#4F617A] font-mono">
                    No spam. No sales pressure. Just honest answers.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
