import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ArrowRight, Zap, Clock, Database, CheckCircle2, Star } from "lucide-react";
import { SiAirtable, SiZapier, SiMake, SiN8N, SiTelegram, SiWhatsapp } from "react-icons/si";
import { VideoTestimonialCarousel } from "@/components/VideoTestimonialCarousel";

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
import wf16 from "@assets/Screenshot_2026-04-06_at_4.29.55_PM_1776459171184.png";
import wf17 from "@assets/Screenshot_2026-04-06_at_4.30.22_PM_1776459171183.png";
import wf18 from "@assets/Screenshot_2026-04-06_at_4.30.41_PM_1776459171182.png";
import wf19 from "@assets/Screenshot_2026-04-06_at_4.30.49_PM_1776459171182.png";
import wf20 from "@assets/Screenshot_2026-04-06_at_4.34.04_PM_1776459171182.png";
import wf21 from "@assets/Screenshot_2026-04-06_at_4.38.44_PM_1776459171181.png";
import wf22 from "@assets/Screenshot_2026-04-06_at_4.38.59_PM_1776459171174.png";
import wf23 from "@assets/Screenshot_2026-04-06_at_4.39.08_PM_1776459171177.png";
import wf24 from "@assets/Screenshot_2026-04-06_at_4.39.17_PM_1776459171178.png";
import wf25 from "@assets/Screenshot_2026-04-06_at_4.39.30_PM_1776459171178.png";
import wf26 from "@assets/Screenshot_2026-04-06_at_4.39.37_PM_1776459171179.png";
import wf27 from "@assets/Screenshot_2026-04-06_at_4.39.45_PM_1776459171179.png";
import wf28 from "@assets/Screenshot_2026-04-06_at_4.39.56_PM_1776459171168.png";
import wf29 from "@assets/Screenshot_2026-04-06_at_4.41.07_PM_1776459171169.png";
import wf30 from "@assets/Screenshot_2026-04-06_at_4.41.34_PM_1776459171170.png";
import wf31 from "@assets/Screenshot_2026-04-06_at_4.41.45_PM_1776459171171.png";
import wf32 from "@assets/Screenshot_2026-04-06_at_4.41.51_PM_1776459171172.png";
import wf33 from "@assets/Screenshot_2026-04-06_at_4.41.57_PM_1776459171172.png";
import wf34 from "@assets/Screenshot_2026-04-06_at_4.42.05_PM_1776459171167.png";
import wf35 from "@assets/Screenshot_2026-04-13_at_5.29.09_AM_1776459909686.png";
import wf36 from "@assets/Screenshot_2026-04-13_at_5.29.23_AM_1776459909687.png";
import wf37 from "@assets/Screenshot_2026-04-13_at_5.29.30_AM_1776459909687.png";
import wf38 from "@assets/Screenshot_2026-04-13_at_5.29.46_AM_1776459909688.png";
import wf39 from "@assets/Screenshot_2026-04-13_at_5.29.54_AM_1776459909689.png";
import wf40 from "@assets/Screenshot_2026-04-13_at_5.30.04_AM_1776459909691.png";
import wf41 from "@assets/Screenshot_2026-04-13_at_5.30.16_AM_1776459909683.png";
import wf42 from "@assets/Screenshot_2026-04-13_at_5.30.22_AM_1776459909683.png";
import wf43 from "@assets/Screenshot_2026-04-13_at_5.30.39_AM_1776459909684.png";
import wf44 from "@assets/Screenshot_2026-04-13_at_5.30.44_AM_1776459909684.png";
import wf45 from "@assets/Screenshot_2026-04-13_at_5.31.02_AM_1776459909685.png";
import wf46 from "@assets/Screenshot_2026-04-13_at_5.31.09_AM_1776459909685.png";
import wf47 from "@assets/Screenshot_2026-04-13_at_5.31.20_AM_1776459909672.png";
import wf48 from "@assets/Screenshot_2026-04-13_at_5.32.01_AM_1776459909673.png";
import wf49 from "@assets/Screenshot_2026-04-13_at_5.32.24_AM_1776459909674.png";
import wf50 from "@assets/Screenshot_2026-04-13_at_5.32.58_AM_1776459909676.png";
import wf51 from "@assets/Screenshot_2026-04-13_at_5.33.39_AM_1776459909680.png";
import wf52 from "@assets/Screenshot_2026-04-13_at_5.34.01_AM_1776459909682.png";
import wf53 from "@assets/Screenshot_2026-04-13_at_5.34.31_AM_1776459909669.png";
import wf54 from "@assets/Screenshot_2026-04-01_at_1.56.30_AM_1776460016065.png";
import wf55 from "@assets/Screenshot_2026-04-02_at_3.49.25_AM_1776460016078.png";
import wf56 from "@assets/Screenshot_2026-04-02_at_3.49.36_AM_1776460016080.png";
import wf57 from "@assets/Screenshot_2026-04-02_at_3.49.59_AM_1776460016081.png";
import wf58 from "@assets/Screenshot_2026-04-02_at_3.50.12_AM_1776460016082.png";
import wf59 from "@assets/Screenshot_2026-04-02_at_3.50.26_AM_1776460016082.png";
import wf60 from "@assets/Screenshot_2026-04-02_at_3.50.38_AM_1776460016083.png";
import wf61 from "@assets/Screenshot_2026-04-02_at_3.52.23_AM_1776460016084.png";
import wf62 from "@assets/Screenshot_2026-04-02_at_3.52.39_AM_1776460016085.png";
import wf63 from "@assets/Screenshot_2026-04-02_at_3.52.50_AM_1776460016086.png";
import wf64 from "@assets/Screenshot_2026-04-02_at_3.56.05_AM_1776460016086.png";
import wf65 from "@assets/Screenshot_2026-04-02_at_3.56.28_AM_1776460016093.png";
import wf66 from "@assets/Screenshot_2026-04-02_at_3.56.36_AM_1776460016094.png";
import wf67 from "@assets/Screenshot_2026-04-02_at_3.56.43_AM_1776460016095.png";
import wf68 from "@assets/Screenshot_2026-04-02_at_3.56.54_AM_1776460016096.png";
import wf69 from "@assets/Screenshot_2026-04-02_at_3.57.03_AM_1776460016098.png";
import wf70 from "@assets/Screenshot_2026-04-02_at_3.58.16_AM_1776460016099.png";
import wf71 from "@assets/Screenshot_2026-04-02_at_3.58.29_AM_1776460016100.png";
import wf72 from "@assets/Screenshot_2026-04-02_at_3.58.39_AM_1776460016101.png";
import profilePic from "@assets/my_profile_pic_1776459432094.jpg";

type WorkflowTag = "n8n" | "Make.com" | "AI Agents" | "Airtable";

const workflows: { img: string; title: string; desc: string; tag: WorkflowTag }[] = [
  { img: wf1,  tag: "n8n",       title: "Automated Video Creation Pipeline",      desc: "End-to-end automation from form submission to video generation and email delivery" },
  { img: wf2,  tag: "n8n",       title: "n8n Workflow Backup System",              desc: "Scheduled backup of all n8n workflows to Google Drive with version tracking" },
  { img: wf3,  tag: "n8n",       title: "Twitter Sentiment Analyzer",              desc: "AI-powered social media monitoring with automated Slack notifications" },
  { img: wf4,  tag: "AI Agents", title: "AI Website Chatbot",                      desc: "Vector store-powered Q&A bot trained on website content using Supabase + OpenAI" },
  { img: wf5,  tag: "n8n",       title: "Appointment Booking System",              desc: "Cal.com integration for automated slot checking and booking via webhook" },
  { img: wf6,  tag: "AI Agents", title: "AI Video Resume Generator",               desc: "Resume-to-video automation with HeyGen AI avatars (male/female voices)" },
  { img: wf7,  tag: "n8n",       title: "Course Deal Alert Bot",                   desc: "Scheduled scraper that finds 50%+ discounts and sends Telegram notifications" },
  { img: wf8,  tag: "AI Agents", title: "n8n AI Customer Support Agent",           desc: "AI agent with inventory, orders, and return policy tools using Airtable" },
  { img: wf9,  tag: "AI Agents", title: "Zep Memory AI Agent",                     desc: "AI agent with persistent memory using Zep + Google Sheets as data source" },
  { img: wf10, tag: "n8n",       title: "HubSpot to Gmail Ticket Notifier",        desc: "Webhook-triggered HubSpot ticket creation with Gmail notification" },
  { img: wf11, tag: "AI Agents", title: "AI Call Transcript Analyzer",             desc: "Automated analysis of transcripts using OpenAI structured output" },
  { img: wf12, tag: "AI Agents", title: "AI Lead Generation System",               desc: "Apify-powered lead scraping with AI outreach email generation and human approval" },
  { img: wf13, tag: "Airtable",  title: "Insurance Renewal Alert System",          desc: "Airtable-based system to check and alert on expiring insurance policies" },
  { img: wf14, tag: "n8n",       title: "Multi-Platform Social Media Automation",  desc: "AI content generation and auto-posting to LinkedIn, Twitter, and Instagram" },
  { img: wf15, tag: "n8n",       title: "Lead Capture to Google Sheets",           desc: "Webhook-triggered lead capture with Google Sheets storage and email notification" },
  { img: wf16, tag: "n8n",       title: "WhatsApp Order Notification Bot",         desc: "Automated order status alerts sent directly to customers via WhatsApp Business API" },
  { img: wf17, tag: "n8n",       title: "AI Email Outreach Sequencer",             desc: "Multi-step cold email campaign automation with AI-personalized content and follow-ups" },
  { img: wf18, tag: "Airtable",  title: "Airtable Project Management System",      desc: "Fully automated project tracker with task assignments, deadline reminders, and status updates" },
  { img: wf19, tag: "Airtable",  title: "E-commerce Inventory Sync",               desc: "Real-time inventory sync between Shopify, Airtable, and Google Sheets with low-stock alerts" },
  { img: wf20, tag: "AI Agents", title: "AI Blog Content Pipeline",                desc: "Automated research-to-publish workflow that generates, formats, and posts SEO blog content" },
  { img: wf21, tag: "n8n",       title: "Client Onboarding Automation",            desc: "End-to-end client welcome flow: contract signing, welcome email, and folder creation" },
  { img: wf22, tag: "AI Agents", title: "Slack Team Digest Bot",                   desc: "Daily AI-generated team digest summarizing tasks, updates, and blockers from multiple tools" },
  { img: wf23, tag: "Airtable",  title: "Google Forms to CRM Pipeline",            desc: "Instant lead capture from Google Forms into Airtable CRM with Slack and email alerts" },
  { img: wf24, tag: "Airtable",  title: "Stripe Payment to Airtable Logger",       desc: "Auto-log every Stripe payment event into Airtable with client and invoice details" },
  { img: wf25, tag: "n8n",       title: "Automated Contract Generator",            desc: "Trigger-based PDF contract generation and delivery via email on new client sign-up" },
  { img: wf26, tag: "AI Agents", title: "RSS Feed to LinkedIn Publisher",          desc: "Scheduled scraping of niche RSS feeds with AI rewriting and auto-publishing to LinkedIn" },
  { img: wf27, tag: "n8n",       title: "Multi-Step Nurture Email Sequence",       desc: "Behavior-triggered drip email system for lead nurturing across a 7-day funnel" },
  { img: wf28, tag: "AI Agents", title: "YouTube Video Repurposing Bot",           desc: "Auto-transcribe YouTube videos and repurpose them into Twitter threads and LinkedIn posts" },
  { img: wf29, tag: "Airtable",  title: "Notion to Airtable Sync",                 desc: "Bidirectional sync keeping Notion pages and Airtable records aligned in real time" },
  { img: wf30, tag: "AI Agents", title: "AI Customer Feedback Analyzer",           desc: "Collect, categorize, and score customer feedback using OpenAI with Airtable storage" },
  { img: wf31, tag: "n8n",       title: "Automated Invoice Reminder System",       desc: "Smart overdue invoice detection with tiered email reminders and Slack alerts" },
  { img: wf32, tag: "n8n",       title: "Webinar Registration Workflow",           desc: "Automated Zoom webinar registration, confirmation email, and 24-hour reminder sequence" },
  { img: wf33, tag: "Airtable",  title: "Team Timesheet Tracker",                  desc: "Weekly timesheet collection via Typeform with automatic Airtable logging and manager summaries" },
  { img: wf34, tag: "AI Agents", title: "AI-Powered FAQ Responder",                desc: "Webhook-triggered FAQ bot that answers common questions using an AI-trained knowledge base" },
  { img: wf35, tag: "Make.com",  title: "Conditional Branching Workflow",          desc: "IF/true/false logic with merged outputs for dynamic, multi-path automation in Make.com" },
  { img: wf36, tag: "n8n",       title: "Scheduled API to Airtable & Discord",     desc: "Scheduled HTTP polling with conditional routing to Airtable records and Discord alerts" },
  { img: wf37, tag: "AI Agents", title: "AI Employee Onboarding System",           desc: "Form-triggered AI agent that provisions Jira accounts and Slack channels based on role" },
  { img: wf38, tag: "AI Agents", title: "Slack RAG Knowledge Bot",                 desc: "Chat-triggered AI agent with Qdrant vector store for company knowledge base Q&A" },
  { img: wf39, tag: "AI Agents", title: "AI Cold Email Personalization System",    desc: "Google Sheets lead list → domain extraction → AI-personalized outreach with Instantly delivery" },
  { img: wf40, tag: "n8n",       title: "Google Workspace User Provisioning",      desc: "Form submission auto-creates Google Workspace accounts, Jira users, and Slack profiles" },
  { img: wf41, tag: "AI Agents", title: "Telegram AI Study Assistant",             desc: "Complex Telegram bot with Google Drive file ingestion, vector embeddings, and AI Q&A" },
  { img: wf42, tag: "n8n",       title: "Gmail PDF Attachment Parser",             desc: "Dual-trigger workflow that fetches and parses PDF attachments from Gmail into structured data" },
  { img: wf43, tag: "n8n",       title: "Email Attachment Data Extractor",         desc: "Gmail trigger merges attachments and runs PDF parsing for automated document processing" },
  { img: wf44, tag: "AI Agents", title: "Groq-Powered AI Webhook Agent",           desc: "Webhook-triggered AI Tools Agent using Groq with Brave search and persistent simple memory" },
  { img: wf45, tag: "n8n",       title: "Microsoft SQL Data Router",               desc: "SQL query results split through dual switch logic, merged and processed for downstream output" },
  { img: wf46, tag: "n8n",       title: "Automated Withdrawal Status Notifier",    desc: "Login-triggered withdrawal polling with status-based Telegram notifications across multiple states" },
  { img: wf47, tag: "n8n",       title: "Error-Aware Email Draft System",          desc: "Dual-trigger (scheduled + error) workflow that generates Gmail drafts with custom field mapping" },
  { img: wf48, tag: "AI Agents", title: "Multi-Tool Gemini AI Agent",              desc: "AI agent connected to YouTube, GitHub, Hacker News, Gmail, Strava, and Google Calendar tools" },
  { img: wf49, tag: "Make.com",  title: "Bulk Email Templating System",            desc: "Customer datastore loop generates both per-item text emails and consolidated HTML digest emails" },
  { img: wf50, tag: "AI Agents", title: "AI Appointment Booking Agent",            desc: "Webhook-powered Gemini 2.5 agent checks calendar availability and creates Google Calendar events" },
  { img: wf51, tag: "AI Agents", title: "AI Video Content Factory",                desc: "Deepseek + ElevenLabs pipeline that generates transcripts, audio, AI images, and uploads to Sheets" },
  { img: wf52, tag: "AI Agents", title: "YouTube Transcript Summarizer Bot",       desc: "Webhook fetches YouTube transcripts, GPT-4o-mini summarizes them, and sends results to Telegram" },
  { img: wf53, tag: "n8n",       title: "Farmer Registration API System",          desc: "Multi-branch n8n API handling new registrations, profile updates, and deactivations with PostgreSQL" },
  { img: wf54, tag: "Make.com",  title: "Invoice Notification System",             desc: "Webhook-triggered Make.com scenario using Twilio, Gmail, and Airtable for payment alerts" },
  { img: wf55, tag: "n8n",       title: "Lead Enrichment & HubSpot CRM",          desc: "Webhook captures leads, enriches data via Apollo, upserts to HubSpot, and notifies the team" },
  { img: wf56, tag: "AI Agents", title: "AI Resume Parser to Airtable",            desc: "Resume submission trigger extracts PDF data with OpenAI and creates a structured Airtable record" },
  { img: wf57, tag: "Airtable",  title: "Interview Scheduler with Google Calendar",desc: "Airtable trigger checks interview status and auto-creates Google Calendar events with email alerts" },
  { img: wf58, tag: "n8n",       title: "Shopify Order to Sheets & Slack",         desc: "Shopify event trigger appends order data to Google Sheets and posts a Slack notification instantly" },
  { img: wf59, tag: "n8n",       title: "n8n Workflow Backup to Google Drive",     desc: "Scheduled loop exports all n8n workflows as files and organises them into Google Drive subfolders" },
  { img: wf60, tag: "AI Agents", title: "AI Twitter Sentiment Monitor",            desc: "Scheduled Apify scraper runs AI sentiment analysis on tweets and alerts on negative posts via Slack" },
  { img: wf61, tag: "AI Agents", title: "Website Chatbot with Supabase RAG",      desc: "Scrapes website content, stores embeddings in Supabase, and powers a live Q&A chat agent" },
  { img: wf62, tag: "n8n",       title: "Cal.com Slot Checker & Booking Bot",     desc: "Webhook checks available Cal.com slots and books appointments based on user request type" },
  { img: wf63, tag: "AI Agents", title: "HeyGen AI Video Resume Builder",         desc: "Uploads resume and photo, extracts data with OpenAI, and generates male/female HeyGen avatar videos" },
  { img: wf64, tag: "AI Agents", title: "HeyGen Video Resume (Alternate Flow)",   desc: "Extended resume-to-video pipeline with gender detection, wait loop, and Google Sheets storage" },
  { img: wf65, tag: "n8n",       title: "Udemy Course Deal Scraper Bot",          desc: "Scheduled browser scraper finds 50%+ discounts, checks for duplicates, and sends Telegram alerts" },
  { img: wf66, tag: "AI Agents", title: "Airtable-Powered AI Support Agent",      desc: "Chat-triggered AI agent with Airtable tools for inventory lookups, orders, and return policy queries" },
  { img: wf67, tag: "AI Agents", title: "Zep Long-Term Memory AI Agent",          desc: "AI agent with persistent Zep memory reads orders and inventory from Google Sheets on demand" },
  { img: wf68, tag: "n8n",       title: "HubSpot Webhook to Gmail Notifier",      desc: "HubSpot webhook creates a support ticket and sends an instant Gmail notification to the team" },
  { img: wf69, tag: "AI Agents", title: "Batch Call Transcript Analyzer",         desc: "Scheduled Google Sheets loop sends transcripts to OpenAI structured output and stores results" },
  { img: wf70, tag: "AI Agents", title: "Apify-Powered AI Lead Outreach System",  desc: "Form-triggered Apify lead scraper with AI email generation, human approval step, and Gmail delivery" },
  { img: wf71, tag: "Airtable",  title: "Airtable Insurance Renewal Alerts",      desc: "Daily Airtable check flags expired records and sends renewal alert emails automatically" },
  { img: wf72, tag: "n8n",       title: "3-Platform Social Media Auto-Poster",    desc: "Three-trigger pipeline generates AI content and auto-posts to LinkedIn, Twitter, and Instagram" },
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

const TAG_CONFIG: Record<WorkflowTag | "All", { label: string; color: string; dot: string }> = {
  "All":       { label: "All",       color: "bg-primary/10 text-primary border-primary/30",          dot: "bg-primary" },
  "n8n":       { label: "n8n",       color: "bg-[#FF6D5A]/10 text-[#d14a37] border-[#FF6D5A]/30",    dot: "bg-[#FF6D5A]" },
  "Make.com":  { label: "Make.com",  color: "bg-purple-100 text-purple-700 border-purple-200",        dot: "bg-purple-500" },
  "AI Agents": { label: "AI Agents", color: "bg-indigo-100 text-indigo-700 border-indigo-200",        dot: "bg-indigo-500" },
  "Airtable":  { label: "Airtable",  color: "bg-amber-100 text-amber-700 border-amber-200",           dot: "bg-amber-500" },
};

const CARD_TAG_STYLE: Record<WorkflowTag, string> = {
  "n8n":       "bg-[#FF6D5A]/10 text-[#d14a37]",
  "Make.com":  "bg-purple-100 text-purple-700",
  "AI Agents": "bg-indigo-100 text-indigo-700",
  "Airtable":  "bg-amber-100 text-amber-700",
};

function WorkflowShowcase() {
  const [activeFilter, setActiveFilter] = useState<WorkflowTag | "All">("All");

  const filters = (["All", "n8n", "Make.com", "AI Agents", "Airtable"] as const);

  const filtered = activeFilter === "All"
    ? workflows
    : workflows.filter(w => w.tag === activeFilter);

  const countFor = (tag: WorkflowTag | "All") =>
    tag === "All" ? workflows.length : workflows.filter(w => w.tag === tag).length;

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proven Systems</h2>
          <p className="text-lg text-muted-foreground">A look inside the engine. Real systems built for real businesses.</p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map(tag => {
            const cfg = TAG_CONFIG[tag];
            const isActive = activeFilter === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full border font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md ${
                  isActive
                    ? `${cfg.color} shadow-md scale-105`
                    : "bg-white border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? cfg.dot : "bg-muted-foreground/40"}`} />
                {cfg.label}
                <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-semibold ${isActive ? "bg-white/50" : "bg-muted"}`}>
                  {countFor(tag)}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="filter-active-pill"
                    className="absolute inset-0 rounded-full border-2 border-current opacity-30 pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((wf) => (
              <motion.div
                key={wf.img}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.25 }}
              >
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
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${CARD_TAG_STYLE[wf.tag]}`}>
                      {wf.tag}
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{wf.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{wf.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {

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
                  <a href="https://wa.me/2348143046516" target="_blank" rel="noopener noreferrer">
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
        <WorkflowShowcase />

        {/* 6. VIDEO TESTIMONIALS CAROUSEL */}
        <section className="py-24 bg-white border-y border-border/50">
          <div className="container mx-auto px-4 md:px-8 max-w-lg">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Hear From Clients</h2>
                <p className="text-lg text-muted-foreground">Real stories from businesses we've transformed.</p>
              </motion.div>
              <motion.div variants={fadeIn}>
                <VideoTestimonialCarousel />
              </motion.div>
            </motion.div>
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
                  src={profilePic}
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
                  <a href="https://wa.me/2348143046516" target="_blank" rel="noopener noreferrer">
                    <SiWhatsapp className="mr-3 w-6 h-6" /> Message Me on WhatsApp
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/30 bg-white/5 hover:bg-white/20 text-white h-16 px-10 text-lg w-full sm:w-auto backdrop-blur-sm transition-all" asChild>
                  <a href="https://t.me/+2348143046516" target="_blank" rel="noopener noreferrer">
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