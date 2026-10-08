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
// time after the page has loaded, so by the time anyone clicks it is already
// here. The dialog only opens once the chunk is in, so there is never an
// empty frame.
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
        if (!next) return setOpen(false);
        loadForm().then(() => setOpen(true), () => setOpen(true));
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

        <Suspense fallback={null}>
          <OnboardingForm onSent={() => setOpen(false)} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
