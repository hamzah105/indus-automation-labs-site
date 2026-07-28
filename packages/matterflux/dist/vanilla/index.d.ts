import { e as MatterFluxOptions, c as MatterFluxInstance } from '../types-CEXv_b_p.js';
export { b as MatterFluxEvent, M as MatterFluxIntensity, d as MatterFluxMode, f as MatterFluxTarget } from '../types-CEXv_b_p.js';

declare function createMatterFlux(defaultOptions?: MatterFluxOptions): MatterFluxInstance;
declare const MatterFlux: Readonly<{
    create: typeof createMatterFlux;
}>;

export { MatterFlux, MatterFluxInstance, MatterFluxOptions, createMatterFlux };
