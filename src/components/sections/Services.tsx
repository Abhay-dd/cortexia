"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientOrb from "@/components/effects/GradientOrb";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Services() {
  return (
    <section id="services" className="relative section-padding overflow-hidden">
      <GradientOrb
        className="-bottom-40 -left-40 z-0"
        color1="rgba(37,99,235,0.08)"
        color2="rgba(6,182,212,0.04)"
        size={450}
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          title="Our Services"
          subtitle="End-to-end AI and software engineering services designed to accelerate your business transformation."
        />

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
              />

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 transition-transform duration-300 group-hover:scale-110`}
              >
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold mb-3">{service.title}</h3>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More */}
              <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors group/btn">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>

              {/* Corner glow */}
              <div
                className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.06] blur-3xl transition-opacity duration-500 rounded-full`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
