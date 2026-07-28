"use client";

import type { ReactNode } from "react";
import { MatterFluxProvider } from "@/packages/matterflux/src/react";

export function SiteMatterFluxProvider({ children }: { children: ReactNode }) {
  return <MatterFluxProvider>{children}</MatterFluxProvider>;
}
