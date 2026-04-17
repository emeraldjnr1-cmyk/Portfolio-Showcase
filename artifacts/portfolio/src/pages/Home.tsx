import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ChevronRight, ArrowRight, Zap, Clock, Database, CheckCircle2, Play, Star } from "lucide-react";
import { SiAirtable, SiZapier, SiMake, SiN8N, SiTelegram, SiWhatsapp } from "react-icons/si";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Workflow Assets
import wf1 from "@assets/Screenshot_2026-04-06_at_4.25.22_PM_1776404337937.png";
import wf2 from "@assets/Screenshot_2026-04-02_at_3.50.26_AM_1776404406298.png";
import wf3 from "@assets/Screenshot_2026-04-02_at_3.50.38_AM_1776404406302.png";
import wf4 from "@assets/Screenshot_2026-04-02_at_3.52.23_AM_1776404406302.png";
import wf5 from "@assets/Screenshot_2026-04-02_at_3.52.39_AM_1776404406304.png";
import wf6 from "@assets/Screenshot_2026-04-02_at_3.52.50_AM_1776404406305.png";
import wf7 from "@assets/Screenshot_2026-04-02_at_3.56.28_AM_1776404406306.png";
import wf8 from "@assets/Screenshot_2026-04-02_at_3.56.36_AM_1776404406307.png";
import wf9 from "@assets/Screenshot_2026-04-02_at_3.56.43_AM_1776404406307.png";
import wf10 from "@assets/Screenshot_2026-04-02_at_3.56.54_AM_1776404406308.png";
import wf11 from "@assets/Screenshot_2026-04-02_at_3.57.03_AM_1776404406308.png";
import wf12 from "@assets/Screenshot_2026-04-02_at_3.58.16_AM_1776404406309.png";
import wf13 from "@assets/Screenshot_2026-04-02_at_3.58.29_AM_1776404406309.png";
import wf14 from "@assets/Screenshot_2026-04-02_at_3.58.39_AM_1776404406310.png";
import wf15 from "@assets/Screenshot_2026-04-02_at_3.58.52_AM_1776404406310.png";

const workflows = [
  { img: wf1, title: "Automated Video Creation Pipeline", desc: "End-to-end automation from form submission to video generation and email delivery" },
  { img: wf2, title: "n8n Workflow Backup System", desc: "Scheduled backup of all n8n workflows to Google Drive with version tracking" },
  { img: wf3, title: "Twitter Sentiment Analyzer", desc: "AI-powered social media monitoring with automated Slack notifications" },
  { img: wf4, title: "AI Website Chatbot", desc: "Vector store-powered Q&A bot trained on website content using Supabase + OpenAI" },
  { img: wf5, title: "Appointment Booking System", desc: "Cal.com integration for automated slot checking and booking via webhook" },
  { img: wf6, title: "AI Video Resume Generator", desc: "Resume-to-video automation with HeyGen AI avatars (male/female voices)" },
  { img: wf7, title: "Course Deal Alert Bot", desc: "Scheduled scraper that finds 50%+ discounts and sends Telegram notifications" },
  { img: wf8, title: "n8n AI Customer Support Agent", desc: "AI agent with inventory, orders, and return policy tools using Airtable" },
  { img: wf9, title: "Zep Memory AI Agent", desc: "AI agent with persistent memory using Zep + Google Sheets as data source" },
  { img: wf10, title: "HubSpot to Gmail Ticket Notifier", desc: "Webhook-triggered HubSpot ticket creation with Gmail notification" },
  { img: wf11, title: "AI Call Transcript Analyzer", desc: "Automated analysis of transcripts using OpenAI structured output" },
  { img: wf12, title: "AI Lead Generation System", desc: "Apify-powered lead scraping with AI outreach email generation and human approval" },
  { img: wf13, title: "Insurance Renewal Alert System", desc: "Airtable-based system to check and alert on expiring insurance policies" },
  { img: wf14, title: "Multi-Platform Social Media Automation", desc: "AI content generation and auto-posting to LinkedIn, Twitter, and Instagram" },
  { img: wf15, title: "Lead Capture to Google Sheets", desc: "Webhook-triggered lead capture with Google Sheets storage and email notification" },
];

const services = [
  { icon: <SiAirtable className="w-8 h-8 text-[#1F3A5F]" />, title: "Airtable CRM Development", desc: "Custom CRM systems to track, manage, and scale your leads" },
  { icon: <SiMake className="w-8 h-8 text-[#1F3A5F]" />, title: "Make.com Automation", desc: "Advanced workflow automation connecting all your tools" },
  { icon: <SiZapier className="w-8 h-8 text-[#1F3A5F]" />, title: "Zapier Automation", desc: "Simple and reliable automation for everyday business processes" },
  { icon: <SiN8N className="w-8 h-8 text-[#1F3A5F]" />, title: "n8n Automation", desc: "Flexible, powerful automation for advanced use cases" },
  { icon: <CheckCircle2 className="w-8 h-8 text-[#1F3A5F]" />, title: "Done-For-You Systems", desc: "I build complete systems tailored to your business" },
  { icon: <Database className="w-8 h-8 text-[#1F3A5F]" />, title: "Automation Consulting", desc: "I help you design the best automation strategy for your workflow" },
];

const capabilities = [
  "Lead capture automation", "WhatsApp chatbot automation", "Email follow-ups", 
  "CRM automation", "Appointment booking systems", "Invoice & billing automation", 
  "Client onboarding systems", "Document collection systems", "Social media automation", 
  "API integrations", "AI chatbot integrations"
];

const reviews = [
  { name: "James M. — UK", text: "Denver completely transformed how we handle leads. We save 15+ hours every week now." },
  { name: "Priya S. — India", text: "The automation system is flawless. Calm, clear communication throughout the whole process." },
  { name: "Carlos R. — Mexico", text: "Best investment for our agency this year. Make.com and Airtable work perfectly together." },
  { name: "Emma T. — Australia", text: "Exactly what I needed. Professional, fast, and knows the tools inside out." },
  { name: "David K. — USA", text: "Incredible attention to detail. Built an AI support bot that handles 80% of our queries." },
  { name: "Fatima A. — UAE", text: "I can finally focus on growing my business instead of copying and pasting data." }
];

const videoTestimonials = [
  { id: 1, name: "Sarah L.", quote: "Our onboarding time went from 3 days to 5 minutes." },
  { id: 2, name: "Michael R.", quote: "Denver built a system that essentially runs our business." },
  { id: 3, name: "Jessica K.", quote: "The Airtable CRM he built is a game-changer for our sales team." },
  { id: 4, name: "Alex D.", quote: "Saved us a full-time hire. Highly recommend his services." }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 scroll-smooth">
      <Navbar />
      <FloatingWhatsApp />

      <main className="pb-24">
        {/* 1. HERO */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(230,240,245,1)_0%,rgba(255,255,255,1)_100%)] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border shadow-sm text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for new projects
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                I Build Automation Systems That <span className="text-primary relative inline-block">
                  Save Time
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6C65.5 -1.5 136.5 -1.5 198 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                </span>, Capture Leads, and <span className="text-primary">Grow Your Business</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Stop wasting hours on manual tasks. I design and build robust, done-for-you systems using <strong className="text-foreground">Airtable, Make.com, Zapier, and n8n</strong> so you can focus on scaling.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-full text-base px-8 h-14 w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group" asChild>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    <SiWhatsapp className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" /> Message Me on WhatsApp
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. PROBLEM SECTION */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div>
                <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                  You didn't start a business to do <span className="text-muted-foreground line-through">data entry.</span>
                </motion.h2>
                <div className="space-y-6">
                  {[
                    "Manual work is slowing you down.",
                    "Leads are slipping through the cracks.",
                    "You're wasting hours on repetitive tasks."
                  ].map((pain, i) => (
                    <motion.div variants={fadeIn} key={i} className="flex items-start gap-4">
                      <div className="mt-1 bg-red-50 p-2 rounded-full text-red-500 shrink-0">
                        <Zap className="w-5 h-5" />
                      </div>
                      <p className="text-lg text-muted-foreground font-medium">{pain}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div variants={fadeIn} className="bg-background rounded-[2rem] p-10 border border-border shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
                <h3 className="text-3xl font-bold mb-4 text-foreground">I solve this with smart automation systems.</h3>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  By connecting your tools and building custom logic, we turn hours of manual work into seamless, reliable background processes.
                </p>
                <Button variant="default" className="rounded-full w-full h-12 text-base group" asChild>
                  <a href="#how-it-works">See how it works <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. SERVICES */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Services</h2>
              <p className="text-lg text-muted-foreground">Expert implementation across the modern no-code stack.</p>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {services.map((service, i) => (
                <motion.div variants={fadeIn} key={i}>
                  <Card className="h-full border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white group rounded-2xl overflow-hidden cursor-default">
                    <CardContent className="p-8">
                      <div className="mb-6 p-4 bg-background rounded-2xl inline-block group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. AUTOMATION CAPABILITIES */}
        <section className="py-24 bg-white border-y border-border/50">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-3xl font-bold mb-12">
              What Can We Automate?
            </motion.h2>
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="flex flex-wrap justify-center gap-4"
            >
              {capabilities.map((cap, i) => (
                <motion.div 
                  variants={fadeIn} 
                  key={i}
                  className="px-5 py-3 bg-background rounded-full border border-border text-foreground font-medium flex items-center gap-2 hover:border-primary hover:bg-primary/5 transition-all cursor-default shadow-sm hover:shadow-md"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {cap}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. WORKFLOW SHOWCASE */}
        <section className="py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Proven Systems</h2>
              <p className="text-lg text-muted-foreground">A look inside the engine. Real systems built for real businesses.</p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {workflows.map((wf, i) => (
                <motion.div variants={fadeIn} key={i}>
                  <Card className="overflow-hidden h-full group bg-white border-border/50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted border-b border-border/50">
                      <img 
                        src={wf.img} 
                        alt={wf.title} 
                        className="object-cover object-top w-full h-full group-hover:scale-105 group-hover:blur-[2px] transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button variant="secondary" className="rounded-full pointer-events-none">View Details</Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{wf.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{wf.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. VIDEO TESTIMONIALS CAROUSEL */}
        <section className="py-24 bg-white border-y border-border/50">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Hear From Clients</h2>
              <p className="text-lg text-muted-foreground">Real stories from businesses we've transformed.</p>
            </div>
            
            <div className="px-10">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[autoplayPlugin.current]}
                className="w-full"
              >
                <CarouselContent className="-ml-4 md:-ml-6">
                  {videoTestimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                      <div className="group cursor-pointer">
                        <div className="relative aspect-[9/16] bg-slate-100 rounded-3xl overflow-hidden mb-6 border border-border/80 shadow-sm group-hover:shadow-xl transition-all duration-500">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                              <Play className="w-6 h-6 ml-1" />
                            </div>
                          </div>
                          {/* Placeholder image for video thumbnail */}
                          <img 
                            src={`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww`}
                            alt={`Testimonial from ${testimonial.name}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <h4 className="font-bold text-center text-xl mb-2">{testimonial.name}</h4>
                        <p className="text-center text-muted-foreground italic px-4">"{testimonial.quote}"</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-12 h-12 w-12 border-2" />
                <CarouselNext className="-right-4 md:-right-12 h-12 w-12 border-2" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* 7. CLIENT REVIEWS */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by 50+ Clients Worldwide</h2>
              <div className="flex justify-center gap-1 text-[#FFB800] mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-6 h-6" />)}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm">
                <span className="font-semibold text-foreground">Level 2 Seller</span>
                <span className="text-muted-foreground">on Fiverr</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <Card key={i} className="bg-white rounded-2xl shadow-sm border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex gap-1 text-[#FFB800] mb-6">
                      {[...Array(5)].map((_, j) => <Star key={j} className="fill-current w-4 h-4" />)}
                    </div>
                    <p className="text-foreground mb-6 text-lg leading-relaxed">"{review.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <p className="font-bold text-sm text-foreground">{review.name}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 8. HOW IT WORKS */}
        <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-background rounded-l-[100px] -z-10 opacity-50" />
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">How We Work Together</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A simple, transparent process to get your automation systems up and running quickly.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 relative">
              <div className="hidden md:block absolute top-12 left-24 right-24 h-0.5 bg-border -z-10" />
              
              {[
                { step: "01", title: "Tell me your workflow", desc: "We discuss your current manual processes, identify bottlenecks, and map out the ideal flow." },
                { step: "02", title: "I build your system", desc: "I architect and implement a custom, reliable automation logic using the best tools for the job." },
                { step: "03", title: "You save time & scale", desc: "The system runs automatically in the background. We test, refine, and you focus on growth." }
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="w-24 h-24 mx-auto bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-8 border-4 border-primary/20 shadow-xl relative z-10">
                    <span className="absolute inset-0 rounded-full bg-primary opacity-10 animate-ping" style={{ animationDuration: '3s', animationDelay: `${i * 0.5}s` }} />
                    {step.step}
                  </div>
                  <div className="bg-background md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none text-center">
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. ABOUT DENVER */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-border/50 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="w-48 h-48 md:w-72 md:h-72 rounded-[2rem] overflow-hidden bg-slate-100 shrink-0 border border-border shadow-inner rotate-3 hover:rotate-0 transition-transform duration-500 relative z-10">
                <img 
                  src="https://api.dicebear.com/7.x/initials/svg?seed=DP&backgroundColor=1F3A5F&textColor=ffffff" 
                  alt="Denver Peter" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Hi, I'm Denver Peter.</h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold mb-8">
                  <Zap className="w-4 h-4" /> No-Code Automation Specialist
                </div>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    With over <strong className="text-foreground">4 years of experience</strong>, I help businesses streamline their operations and grow through smart, reliable automation systems.
                  </p>
                  <p>
                    I've worked with <strong className="text-foreground">50+ clients globally</strong>, delivered over <strong className="text-foreground">200 automation systems</strong>, and reached Level 2 Seller status on Fiverr. I'm calm, easy to work with, and strictly focused on delivering real value through systems that actually work day in and day out.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeIn} className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Ready to automate your business?</motion.h2>
              <motion.p variants={fadeIn} className="text-xl md:text-2xl opacity-90 mb-12 font-light">Let's build a system that works while you sleep.</motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
                <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 hover:scale-105 h-16 px-10 text-lg w-full sm:w-auto shadow-2xl transition-all" asChild>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    <SiWhatsapp className="mr-3 w-6 h-6" /> Message Me on WhatsApp
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/30 bg-white/5 hover:bg-white/20 text-white h-16 px-10 text-lg w-full sm:w-auto backdrop-blur-sm transition-all" asChild>
                  <a href="https://t.me/DenverNoCode" target="_blank" rel="noopener noreferrer">
                    <SiTelegram className="mr-3 w-6 h-6" /> Telegram
                  </a>
                </Button>
              </motion.div>
              
              <motion.p variants={fadeIn} className="text-sm opacity-80 flex items-center justify-center gap-2 bg-black/20 inline-flex px-6 py-3 rounded-full backdrop-blur-md">
                <Clock className="w-4 h-4" /> Limited availability for new projects this month
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-background border-t border-border text-center">
        <div className="container mx-auto px-4">
          <div className="font-bold text-2xl tracking-tight text-foreground mb-4">
            Denver No-Code
          </div>
          <p className="text-muted-foreground mb-6">Building systems that save time and grow businesses.</p>
          <p className="text-sm text-muted-foreground/60">© {new Date().getFullYear()} Denver Peter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}