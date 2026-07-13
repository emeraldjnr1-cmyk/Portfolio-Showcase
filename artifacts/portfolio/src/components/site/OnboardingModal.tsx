import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/denvernocode@gmail.com";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  whatsapp: z.string().min(7, "Enter a valid WhatsApp number"),
  email: z.string().email("Enter a valid address"),
  service: z.string().min(1, "Pick one"),
  details: z.string().min(10, "Tell me a little more"),
});

type Values = z.infer<typeof schema>;

const SERVICES = [
  "Claude Code build",
  "AI automation",
  "Website",
  "Something else",
];

const inputCls =
  "h-12 rounded-xl border-2 border-black/15 bg-white px-4 font-sans text-base text-black placeholder:text-black/35 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0";

export function OnboardingModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      whatsapp: "",
      email: "",
      service: "",
      details: "",
    },
  });

  async function onSubmit(values: Values) {
    setSending(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "First name": values.firstName,
          "Last name": values.lastName,
          "WhatsApp": values.whatsapp,
          email: values.email,
          "Looking for": values.service,
          "Project details": values.details,
          _subject: `New onboarding request from ${values.firstName} ${values.lastName}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast({
        title: "Request sent",
        description: "Thanks! I will get back to you on WhatsApp within 24 hours.",
      });
      form.reset();
      setOpen(false);
    } catch {
      toast({
        title: "Something went wrong",
        description: "The form could not be sent. Please message me on WhatsApp instead.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-3xl border-2 border-black bg-[#E7E7E1] p-8 text-black">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-extrabold tracking-tight">
            Start your project
          </DialogTitle>
          <DialogDescription className="font-editorial text-lg text-black/60">
            A few quick details and I will reach out to you directly.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-display text-xs font-bold uppercase tracking-widest">First name</FormLabel>
                    <FormControl>
                      <Input className={inputCls} placeholder="Jane" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-display text-xs font-bold uppercase tracking-widest">Last name</FormLabel>
                    <FormControl>
                      <Input className={inputCls} placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-display text-xs font-bold uppercase tracking-widest">WhatsApp number</FormLabel>
                    <FormControl>
                      <Input className={inputCls} type="tel" placeholder="+1 555 000 0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-display text-xs font-bold uppercase tracking-widest">Email</FormLabel>
                    <FormControl>
                      <Input className={inputCls} type="email" placeholder="jane@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-display text-xs font-bold uppercase tracking-widest">What are you looking for?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={inputCls} data-cursor="hover">
                        <SelectValue placeholder="Pick one" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl border-2 border-black/15 bg-white text-black">
                      {SERVICES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-display text-xs font-bold uppercase tracking-widest">What would you like to automate?</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-28 rounded-xl border-2 border-black/15 bg-white px-4 py-3 font-sans text-base text-black placeholder:text-black/35 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Tell me about your business and what eats up your time..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={sending}
              data-cursor="hover"
              className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary font-display text-lg font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send request"}
              {!sending && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
            </button>
            <p className="text-center text-xs text-black/40">
              Your details go straight to me. No spam, ever.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
