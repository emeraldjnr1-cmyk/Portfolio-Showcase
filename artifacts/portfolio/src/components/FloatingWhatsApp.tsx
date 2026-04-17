import React from "react";
import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/2348143046516"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp size={28} />
    </motion.a>
  );
}