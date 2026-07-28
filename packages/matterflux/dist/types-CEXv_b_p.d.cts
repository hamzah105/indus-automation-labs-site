type MatterFluxMode = "success" | "failure";
type MatterFluxIntensity = "low" | "medium" | "high";
type MatterFluxTarget = "_self" | "_blank";
type MatterFluxEvent = {
    clientX: number;
    clientY: number;
    currentTarget?: EventTarget | null;
};
type MatterFluxAction = () => void | Promise<void>;
type MatterFluxOptions = {
    event?: MatterFluxEvent;
    x?: number;
    y?: number;
    origin?: Element | null;
    label?: string;
    mode?: MatterFluxMode;
    href?: string;
    target?: MatterFluxTarget;
    duration?: number;
    intensity?: MatterFluxIntensity;
    particleCount?: number;
    primaryColor?: string;
    secondaryColor?: string;
    coreColor?: string;
    backgroundColor?: string;
    overlayOpacity?: number;
    reducedMotion?: boolean;
    action?: MatterFluxAction;
    successMessage?: string;
    failureMessage?: string;
    onStart?: () => void;
    onComplete?: () => void;
    onError?: (error: unknown) => void;
};
type MatterFluxResolvedOptions = Required<Pick<MatterFluxOptions, "label" | "mode" | "target" | "duration" | "intensity" | "particleCount" | "primaryColor" | "secondaryColor" | "coreColor" | "backgroundColor" | "overlayOpacity" | "reducedMotion" | "successMessage" | "failureMessage">> & {
    center: {
        x: number;
        y: number;
    };
    href?: string;
    action?: MatterFluxAction;
    onStart?: () => void;
    onComplete?: () => void;
    onError?: (error: unknown) => void;
};
type MatterFluxSession = {
    id: number;
    outcome: MatterFluxMode | null;
    outcomeStartedAt: number | null;
    options: MatterFluxResolvedOptions;
};
type MatterFluxInstance = {
    run: (options?: MatterFluxOptions) => Promise<boolean>;
    destroy: () => void;
    isActive: () => boolean;
};

export type { MatterFluxIntensity as M, MatterFluxAction as a, MatterFluxEvent as b, MatterFluxInstance as c, MatterFluxMode as d, MatterFluxOptions as e, MatterFluxTarget as f, MatterFluxSession as g };
