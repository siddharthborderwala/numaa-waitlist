// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // dsn: "https://45da77fa99e4a4174ab95a1659806c9d@o1149520.ingest.us.sentry.io/4509899029020672",
  dsn: "/monitoring",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  tunnel: "/monitoring",
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
