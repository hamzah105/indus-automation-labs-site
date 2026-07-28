"use client";

import { MatterFluxProvider, useMatterFlux } from "@indusautomationlabs/matterflux/react";

function DeployButton() {
  const { runMatterFlux } = useMatterFlux();

  return (
    <button
      type="button"
      onClick={(event) =>
        runMatterFlux({
          event,
          label: "Completing deployment",
          mode: "success",
          intensity: "medium"
        })
      }
    >
      Complete deployment
    </button>
  );
}

export default function ClientDemo() {
  return (
    <MatterFluxProvider>
      <DeployButton />
    </MatterFluxProvider>
  );
}

// Import @indusautomationlabs/matterflux/styles.css from the root app/layout.tsx.
