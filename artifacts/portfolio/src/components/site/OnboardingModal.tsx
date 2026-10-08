import { lazy, Suspense, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

// The form (react-hook-form, zod, the select widget) is code-split. It is
// fetched when the trigger is hovered or focused, or in the browser's idle
// time after the page has loaded, so usually it is already here. The dialog
// opens on the tap regardless: if the form is still downloading (a first visit
// on a slow phone), a placeholder of the fields shows until it arrives. Waiting
// to open felt like a dead button, and a dialog could pop up late after the
// visitor had already moved on.
const loadForm = () => import("./OnboardingForm");
const OnboardingForm = lazy(loadForm);

let warmed = false;
function warm() {
  if (warmed) return;
  warmed = true;
  loadForm().catch(() => {
    warmed = false;
  });
}

export function OnboardingModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(warm, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(warm, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) warm();
        setOpen(next);
      }}
    >
      <DialogTrigger asChild onPointerEnter={warm} onFocus={warm}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-3xl border-2 border-black bg-[#E7E7E1] p-8 text-black">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-extrabold tracking-tight">
            Start your project
          </DialogTitle>
          <DialogDescription className="font-editorial text-lg text-black/60">
            A few quick details and I will reach out to you directly.
          </DialogDescription>
        </DialogHeader>

        <Suspense fallback={<FormPlaceholder />}>
          <OnboardingForm onSent={() => setOpen(false)} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}

/** Same footprint as the form, so nothing jumps when it arrives. */
function FormPlaceholder() {
  return (
    <div className="mt-6 space-y-5" aria-busy="true" aria-label="Loading the form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="h-[68px] animate-pulse rounded-xl bg-black/[0.06]" />
        <div className="h-[68px] animate-pulse rounded-xl bg-black/[0.06]" />
      </div>
      <div className="h-[68px] animate-pulse rounded-xl bg-black/[0.06]" />
      <div className="h-[68px] animate-pulse rounded-xl bg-black/[0.06]" />
      <div className="h-[68px] animate-pulse rounded-xl bg-black/[0.06]" />
      <div className="h-28 animate-pulse rounded-xl bg-black/[0.06]" />
      <div className="h-14 animate-pulse rounded-full bg-black/[0.08]" />
    </div>
  );
}
