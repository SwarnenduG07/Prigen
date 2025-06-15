"use client";
import React from "react";
import { Lock, Zap, HardDrive, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: <Lock className="w-10 h-10 text-purple-500" />,
      title: "End-to-End Encrypted",
      description:
        "Your files are encrypted before transmission and can only be decrypted by the intended recipient",
      ariaLabel: "Security feature",
    },
    {
      icon: <Zap className="w-10 h-10 text-emerald-500" />,
      title: "Lightning Fast",
      description:
        "Upload and download files at blazing fast speeds with our optimized infrastructure",
      ariaLabel: "Speed feature",
    },
    {
      icon: <HardDrive className="w-10 h-10 text-blue-500" />,
      title: "Large File Support",
      description:
        "Share files up to 50MB in size without compression or quality loss",
      ariaLabel: "Storage feature",
    },
    {
      icon: <Share2 className="w-10 h-10 text-pink-500" />,
      title: "Easy Sharing",
      description:
        "Share files with anyone using a simple link and optional password protection",
      ariaLabel: "Sharing feature",
    },
  ];

  return (
    <motion.section
      className="relative py-16 px-4"
      id="features"
      aria-labelledby="features-heading"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div className="relative max-w-6xl mx-auto">
        <motion.h2
          id="features-heading"
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Prigen?
        </motion.h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              role="article"
              aria-label={feature.ariaLabel}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <motion.div
                className="p-3 w-fit rounded-lg bg-neutral-800/50 mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.2 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-200">
                {feature.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
