"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo Mark */}
            <motion.div
              className="relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="font-heading font-bold text-white text-2xl">C</span>
              </div>
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(37, 99, 235, 0.3)",
                    "0 0 0 15px rgba(37, 99, 235, 0)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="font-heading font-bold text-xl tracking-tight">
                Cortexia<span className="text-primary">&nbsp;AI</span>
              </h1>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-48 h-0.5 rounded-full overflow-hidden bg-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
