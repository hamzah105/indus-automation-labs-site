/** Homepage-only, in-memory preference retained during this browser visit. */
export const GALAXY_MOTION_EVENT = "ial:galaxy-motion";
let enabled = true;
export const galaxyMotionEnabled = () => enabled;
export function setGalaxyMotion(enabledForVisit: boolean) {
  enabled = enabledForVisit;
  window.dispatchEvent(new Event(GALAXY_MOTION_EVENT));
}
