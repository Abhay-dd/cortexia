"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, Mail, MapPin, Sparkles } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid work email required"),
  company: z.string().optional(),
  capability: z.string().min(1, "Select a capability"),
  details: z.string().min(15, "Please share brief project details"),
});

type FormData = z.infer<typeof schema>;

const CAPABILITIES = [
  "Artificial Intelligence / ML",
  "Intelligent Workflow Automation",
  "Full-Stack Software Engineering",
  "Cloud & DevOps Architecture",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Contact Submission:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  const inputStyle = "w-full px-4 py-3.5 rounded-2xl text-white text-sm placeholder:text-[#4E6178] focus:outline-none transition-all duration-300 "
    + "bg-[#0B121E] border border-[rgba(0,255,157,0.15)] focus:border-[#00FF9D] focus:shadow-[0_0_20px_rgba(0,255,157,0.2)]";

  return (
    <section id="contact" className="section bg-matrix" style={{ background: "#060A10" }}>
      <div className="container">

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 text-left"
          >
            <div className="label-emerald mb-4">Initiate Partnership</div>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white leading-[1.08] mb-6">
              Let&apos;s Build Your <br />
              <span className="text-gradient-laser">AI Advantage.</span>
            </h2>

            <p className="text-[#8FA3BF] text-base font-light leading-relaxed mb-8">
              Partner with Cortexia AI to engineer custom models, automate complex workflows, 
              and deploy high-throughput production software.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#00FF9D]/10 border border-[#00FF9D]/30 flex items-center justify-center text-[#00FF9D]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8FA3BF] uppercase">Direct Email</div>
                  <a href="mailto:hello@cortexia.ai" className="text-sm font-bold text-white hover:text-[#00FF9D] transition-colors">
                    hello@cortexia.ai
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#00FF9D]/10 border border-[#00FF9D]/30 flex items-center justify-center text-[#00FF9D]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8FA3BF] uppercase">Headquarters</div>
                  <span className="text-sm font-bold text-white">San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div className="card-chrome rounded-3xl p-6 border-[#00FF9D]/30">
              <div className="text-xs font-mono text-[#00FF9D] uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 24-Hour Response Guarantee
              </div>
              <p className="text-xs text-[#8FA3BF] font-light leading-relaxed">
                Every inquiry is reviewed directly by our senior engineering leads. Expect an architectural response within 24 business hours.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="card-chrome rounded-3xl p-8 border-[#00FF9D]/30">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-[#00FF9D] mx-auto animate-bounce" />
                  <h3 className="font-display text-2xl font-bold text-white">Inquiry Transmitted</h3>
                  <p className="text-[#8FA3BF] text-sm font-light">
                    Our engineering leads will review your specs and reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#8FA3BF] uppercase tracking-wider mb-2">Your Name *</label>
                      <input type="text" placeholder="John Doe" className={inputStyle} {...register("name")} />
                      {errors.name && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8FA3BF] uppercase tracking-wider mb-2">Work Email *</label>
                      <input type="email" placeholder="john@company.com" className={inputStyle} {...register("email")} />
                      {errors.email && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#8FA3BF] uppercase tracking-wider mb-2">Company Name</label>
                      <input type="text" placeholder="Acme Inc." className={inputStyle} {...register("company")} />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8FA3BF] uppercase tracking-wider mb-2">Target Capability *</label>
                      <select className={`${inputStyle} appearance-none`} defaultValue="" {...register("capability")}>
                        <option value="" disabled className="bg-[#0B121E]">Select Capability</option>
                        {CAPABILITIES.map((cap) => (
                          <option key={cap} value={cap} className="bg-[#0B121E] text-white">{cap}</option>
                        ))}
                      </select>
                      {errors.capability && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.capability.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8FA3BF] uppercase tracking-wider mb-2">Project Brief & Objectives *</label>
                    <textarea
                      rows={4}
                      placeholder="Outline your technical requirements, goals, or operational challenges..."
                      className={`${inputStyle} resize-none`}
                      {...register("details")}
                    />
                    {errors.details && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.details.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-emerald w-full justify-center text-sm py-4"
                  >
                    {isSubmitting ? "Transmitting..." : (
                      <>
                        Transmit Project Brief
                        <ArrowRight className="w-4 h-4 text-black" />
                      </>
                    )}
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
