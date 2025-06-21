"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bird } from "lucide-react";

function LandingHero(): JSX.Element {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (!isMounted) {
    return (
      <div className="relative flex justify-center pt-28 min-h-screen">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-thin bg-gradient-to-br from-fuchsia-300 to-purple-600 bg-clip-text text-transparent leading-tight">
            Share Your Files With <span className="font-bold">Prigen</span>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative flex justify-center pt-28 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        key="spinning-hole"
      >
        <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-900/10 via-purple-800/15 to-purple-900/10 blur-xl" />

          <div className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-16 rounded-full bg-gradient-to-r from-purple-900/8 via-purple-700/12 to-purple-900/8" />

          <div className="absolute inset-8 sm:inset-16 md:inset-24 lg:inset-32 rounded-full bg-gradient-to-r from-purple-800/15 via-purple-600/20 to-purple-800/15 blur-lg" />

          <div className="absolute inset-12 sm:inset-24 md:inset-36 lg:inset-48 rounded-full bg-gradient-to-r from-black via-neutral-950 to-black" />

          <div className="absolute inset-16 sm:inset-32 md:inset-44 lg:inset-56 rounded-full bg-purple-900/8 blur-xl" />
        </div>
      </motion.div>

      <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
        <motion.h1
          variants={itemVariants}
          className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-thin bg-gradient-to-br from-fuchsia-300 to-purple-600 bg-clip-text text-transparent leading-tight drop-shadow-lg"
        >
          Share Your Files With <span className="font-bold">Prigen</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-gray-300 lg:text-2xl md:text-xl text-lg pt-7 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          Meet the system for modern File Sharing. Blazing Fast Speed, No
          issues, Large Size, End-to-End Encrypted
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4 items-center justify-center">
          <Button
            onClick={() => router.push("/signup")}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white rounded-xl text-lg px-8 py-6 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
          >
            Share Files Now
          </Button>
          <Button
            onClick={() => router.push("/about")}
            className="w-full sm:w-auto bg-transparent border text-neutral-50 border-neutral-200 rounded-xl text-lg px-8 py-6 hover:bg-neutral-900 transition-all duration-200"
          >
            Learn More
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex justify-center mt-8">
          <Bird className="text-purple-500 w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LandingHero;
