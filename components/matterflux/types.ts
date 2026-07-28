export type MatterFluxMode = "success" | "failure";

export type MatterFluxIntensity = "low" | "medium" | "high";

export type MatterFluxTarget = "_self" | "_blank";

export type MatterFluxEvent = {
  clientX: number;
  clientY: number;
};

export type MatterFluxTheme = {
  primaryColor: string;
  secondaryColor: string;
  coreColor: string;
  backgroundColor: string;
};

export type MatterFluxOptions = Partial<MatterFluxTheme> & {
  event?: MatterFluxEvent;
  origin?: HTMLElement | null;
  action?: () => void | Promise<void>;
  href?: string;
  target?: MatterFluxTarget;
  duration?: number;
  particleCount?: number;
  intensity?: MatterFluxIntensity;
  label?: string;
  mode?: MatterFluxMode;
  result?: MatterFluxMode;
  successMessage?: string;
  failureMessage?: string;
};

export type MatterFluxResolvedOptions = MatterFluxTheme & {
  center: { x: number; y: number };
  duration: number;
  particleCount: number;
  intensity: MatterFluxIntensity;
  label: string;
  successMessage: string;
  failureMessage: string;
};

export type MatterFluxSession = {
  id: number;
  outcome: MatterFluxMode | null;
  outcomeStartedAt: number | null;
  options: MatterFluxResolvedOptions;
};

export type MatterFluxContextValue = {
  isActive: boolean;
  runMatterFlux: (options?: MatterFluxOptions) => Promise<boolean>;
};

export type MatterFluxProviderProps = Partial<MatterFluxTheme> & {
  children: ReactNode;
  duration?: number;
  particleCount?: number;
  intensity?: MatterFluxIntensity;
  successMessage?: string;
  failureMessage?: string;
};
import type { ReactNode } from "react";
