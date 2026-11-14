import localFont from "next/font/local";

// Shared only by Labs editorial pages; the surrounding site keeps its typography.
export const labsInter = localFont({
  src: "../public/oomp/fonts/inter-latin.woff2",
  display: "swap",
  variable: "--font-inter",
  weight: "400 600"
});

export const labsSpaceGrotesk = localFont({
  src: "../public/oomp/fonts/space-grotesk-latin.woff2",
  display: "swap",
  variable: "--font-space-grotesk",
  weight: "400 700"
});
