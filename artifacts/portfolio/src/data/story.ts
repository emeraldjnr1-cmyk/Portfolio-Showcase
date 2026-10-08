// Sample data for the "How it runs" scroll story on the home page.
// Everything here is an illustrative example: the agency, the agent and the
// lead are fictional, and the phone number is from a reserved drama range.

export const STORY = {
  agency: "Hartwell & Co",
  agent: "Ada",
  lead: { name: "Amara Okafor", initials: "AO", phone: "+44 7700 900123" },
  enquiry: "Hi, we're looking for a 3-bed near good schools, budget around 450k. Could we view something this week?",
  reply:
    "Hi Amara, thanks for getting in touch, happy to help. We have three 3-beds inside the Northfield and Westbrook school catchments, all within your budget. I can do viewings Thursday afternoon or Saturday morning. Which works for you?",
  signoff: "Ada, Hartwell & Co",
  brief:
    "1 enquiry overnight. Amara Okafor, 3-bed near schools, around 450k. Replied 23:49, viewing offered for Thursday or Saturday. Follow-up call is in your diary.",
} as const;

export type StoryStep = {
  id: string;
  /** The clock on the stage while this step runs. */
  time: string;
  title: string;
  desc: string;
};

export const STORY_STEPS: StoryStep[] = [
  { id: "enquiry", time: "23:47", title: "An enquiry arrives", desc: "From the website form, long after the office closed." },
  { id: "captured", time: "23:47", title: "Captured", desc: "Lands in the CRM as a new lead. Nothing to copy across." },
  { id: "enriched", time: "23:47", title: "Enriched", desc: "Details added: source page, area, budget band, timeframe." },
  { id: "drafted", time: "23:48", title: "Claude drafts a reply", desc: "Reads the message and writes in the agency's own voice." },
  { id: "approved", time: "23:48", title: "A person approves", desc: "Ada gets a push and taps Approve. Nothing goes out without her." },
  { id: "sent", time: "23:49", title: "Sent on WhatsApp", desc: "Amara has a real answer before she puts her phone down." },
  { id: "logged", time: "23:49", title: "Logged, team alerted", desc: "CRM updated, follow-up set, a morning brief waiting at 07:30." },
];
