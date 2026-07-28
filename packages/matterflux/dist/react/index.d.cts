import * as react from 'react';
import { ReactNode } from 'react';
import { g as MatterFluxSession, e as MatterFluxOptions } from '../types-CEXv_b_p.cjs';
export { a as MatterFluxAction, b as MatterFluxEvent, M as MatterFluxIntensity, d as MatterFluxMode, f as MatterFluxTarget } from '../types-CEXv_b_p.cjs';

type MatterFluxOverlayProps = {
    session: MatterFluxSession;
    onComplete: (id: number) => void;
};
declare function MatterFluxOverlay({ session, onComplete }: MatterFluxOverlayProps): react.JSX.Element;

type MatterFluxContextValue = {
    isActive: boolean;
    runMatterFlux: (options?: MatterFluxOptions) => Promise<boolean>;
};
type MatterFluxProviderProps = MatterFluxOptions & {
    children: ReactNode;
};
declare function MatterFluxProvider({ children, ...providerDefaults }: MatterFluxProviderProps): react.JSX.Element;

declare function useMatterFlux(): MatterFluxContextValue;

export { type MatterFluxContextValue, MatterFluxOptions, MatterFluxOverlay, type MatterFluxOverlayProps, MatterFluxProvider, type MatterFluxProviderProps, useMatterFlux };
