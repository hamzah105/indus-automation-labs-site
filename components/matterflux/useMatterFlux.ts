"use client";

import { useContext } from "react";
import { MatterFluxContext } from "./MatterFluxProvider";

export function useMatterFlux() {
  const context = useContext(MatterFluxContext);

  if (!context) {
    throw new Error("useMatterFlux must be used inside a MatterFluxProvider.");
  }

  return context;
}
