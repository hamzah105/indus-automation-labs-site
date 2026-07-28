import "@indusautomationlabs/matterflux/styles.css";
import { MatterFluxProvider, useMatterFlux } from "@indusautomationlabs/matterflux/react";

function DownloadButton() {
  const { isActive, runMatterFlux } = useMatterFlux();

  return (
    <button
      type="button"
      disabled={isActive}
      onClick={(event) =>
        runMatterFlux({
          event,
          label: "Downloading",
          mode: "success"
        })
      }
    >
      Download
    </button>
  );
}

export function App() {
  return (
    <MatterFluxProvider>
      <DownloadButton />
    </MatterFluxProvider>
  );
}
