import { Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { useMotionOff } from "@/lib/motion-pref";
import { routes } from "@/routes";

const { home: Home, services: ServicesIndex, service: ServicePage, industries: IndustriesIndex, industry: IndustryPage } = routes;
const { team: TeamPage, teamProfile: TeamProfilePage, films: FilmsPage, work: WorkIndex, workPage: WorkPage, notFound: NotFound } = routes;

// Keep routeKeyFor() in routes.tsx in step with this list.
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesIndex} />
      <Route path="/services/:slug">{(p) => <ServicePage slug={p.slug} />}</Route>
      <Route path="/industries" component={IndustriesIndex} />
      <Route path="/industries/:slug">{(p) => <IndustryPage slug={p.slug} />}</Route>
      <Route path="/team" component={TeamPage} />
      <Route path="/team/:slug">{(p) => <TeamProfilePage slug={p.slug} />}</Route>
      <Route path="/films" component={FilmsPage} />
      <Route path="/work" component={WorkIndex} />
      <Route path="/work/:slug">{(p) => <WorkPage slug={p.slug} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

/** ssrPath is set only by the build-time prerender, which has no window.location. */
function App({ ssrPath }: { ssrPath?: string }) {
  const motionOff = useMotionOff();
  return (
    <MotionConfig reducedMotion={motionOff ? "always" : "user"}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
        {/* The current route's chunk is always loaded before render (main.tsx,
            entry-server.tsx), so this fallback never shows on a page load. */}
        <Suspense fallback={null}>
          <Router />
        </Suspense>
      </WouterRouter>
      <Toaster />
      <Analytics />
    </MotionConfig>
  );
}

export default App;
