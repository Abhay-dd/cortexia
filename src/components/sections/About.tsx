"use client";

import { motion } from "framer-motion";
import { COMPANY, VALUES, TIMELINE, STATS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GradientOrb from "@/components/effects/GradientOrb";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <GradientOrb
        className="-top-60 -right-60 z-0"
        color1="rgba(6,182,212,0.08)"
        color2="rgba(37,99,235,0.04)"
        size={500}
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          title="About Cortexia AI"
          subtitle="We are a team of AI engineers, designers, and innovators building the future of intelligent business solutions."
        />

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              {/* Who We Are */}
              <div>
                <h3 className="font-heading text-2xl font-bold mb-3">Who We Are</h3>
                <p className="text-muted leading-relaxed">
                  {COMPANY.description} We help businesses adopt AI through modern engineering,
                  automation, and scalable software.
                </p>
              </div>

              {/* Mission */}
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-heading text-lg font-semibold mb-2 text-primary">
                  Our Mission
                </h3>
                <p className="text-muted text-sm leading-relaxed">{COMPANY.mission}</p>
              </div>

              {/* Vision */}
              <div className="pl-4 border-l-2 border-accent/30">
                <h3 className="font-heading text-lg font-semibold mb-2 text-accent">
                  Our Vision
                </h3>
                <p className="text-muted text-sm leading-relaxed">{COMPANY.vision}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Values + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Why Cortexia AI */}
            <h3 className="font-heading text-2xl font-bold mb-6">Why Cortexia AI</h3>
            <motion.div
              className="grid gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {VALUES.map((value) => (
                <motion.div key={value.title} variants={itemVariants}>
                  <GlassCard className="flex items-start gap-4 p-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm mb-1">{value.title}</h4>
                      <p className="text-muted text-xs leading-relaxed">{value.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <motion.h3
            className="font-heading text-2xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Journey
          </motion.h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent hidden md:block" />

            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <GlassCard className="inline-block max-w-sm p-5">
                      <span className="text-xs font-mono text-primary">{item.year}</span>
                      <h4 className="font-heading font-semibold mt-1 mb-2">{item.title}</h4>
                      <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                    </GlassCard>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex flex-shrink-0 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
