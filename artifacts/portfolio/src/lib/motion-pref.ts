import { useEffect, useState } from "react";

// One switch for every animation on the site: the visitor's system setting
// (prefers-reduced-motion) OR the "Animations off" toggle in the footer.
// The toggle is stored per browser and mirrored onto <html data-motion="off">
// so plain CSS (marquees, pulses, page transitions) can obey it too.

const KEY = "dnc-motion";
const EVENT = "dnc-motion-change";

function systemReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function userMotionOff(): boolean {
  try {
    return localStorage.getItem(KEY) === "off";
  } catch {
    return false;
  }
}

export function motionOff(): boolean {
  return systemReduced() || userMotionOff();
}

export function setUserMotionOff(off: boolean) {
  try {
    if (off) localStorage.setItem(KEY, "off");
    else localStorage.removeItem(KEY);
  } catch {
    // Blocked storage: the switch still works for this page view.
  }
  document.documentElement.dataset.motion = off ? "off" : "on";
  window.dispatchEvent(new Event(EVENT));
}

/** True when animations should not run. Re-renders when either setting changes. */
export function useMotionOff(): boolean {
  const [off, setOff] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOff(motionOff());
    update();
    mq.addEventListener("change", update);
    window.addEventListener(EVENT, update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener(EVENT, update);
    };
  }, []);
  return off;
}

/** Just the footer toggle's own state, for its label. */
export function useUserMotionOff(): [boolean, (off: boolean) => void] {
  const [off, setOff] = useState(false);
  useEffect(() => {
    const update = () => setOff(userMotionOff());
    update();
    window.addEventListener(EVENT, update);
    return () => window.removeEventListener(EVENT, update);
  }, []);
  return [off, setUserMotionOff];
}
