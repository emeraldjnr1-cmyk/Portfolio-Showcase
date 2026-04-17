import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="font-bold text-xl tracking-tight text-foreground">
          Denver No-Code
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="default" className="rounded-full px-6">
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              Let's Talk
            </a>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}