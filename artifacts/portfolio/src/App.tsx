import { Switch, Route, Router as WouterRouter } from "wouter";
import { MotionConfig } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { ServicesIndex, ServicePage } from "@/pages/Services";
import { WorkIndex, WorkPage } from "@/pages/Work";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesIndex} />
      <Route path="/services/:slug">{(p) => <ServicePage slug={p.slug} />}</Route>
      <Route path="/work" component={WorkIndex} />
      <Route path="/work/:slug">{(p) => <WorkPage slug={p.slug} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

/** ssrPath is set only by the build-time prerender, which has no window.location. */
function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
            <Router />
          </WouterRouter>
          <Toaster />
          <Analytics />
        </TooltipProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}

export default App;
