export { MatterFlux, createMatterFlux } from './vanilla/index.cjs';
import { M as MatterFluxIntensity } from './types-CEXv_b_p.cjs';
export { a as MatterFluxAction, b as MatterFluxEvent, c as MatterFluxInstance, d as MatterFluxMode, e as MatterFluxOptions, f as MatterFluxTarget } from './types-CEXv_b_p.cjs';

declare const MATTERFLUX_DEFAULTS: {
    primaryColor: string;
    secondaryColor: string;
    coreColor: string;
    backgroundColor: string;
    overlayOpacity: number;
    duration: number;
    intensity: MatterFluxIntensity;
    label: string;
    successMessage: string;
    failureMessage: string;
};
declare const MATTERFLUX_PARTICLE_COUNTS: Record<MatterFluxIntensity, {
    desktop: number;
    mobile: number;
}>;

export { MATTERFLUX_DEFAULTS, MATTERFLUX_PARTICLE_COUNTS, MatterFluxIntensity };
