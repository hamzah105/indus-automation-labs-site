export type IconName =
  | "arrow"
  | "automation"
  | "camera"
  | "catalog"
  | "check"
  | "connected"
  | "dashboard"
  | "download"
  | "license"
  | "lock"
  | "mail"
  | "memory"
  | "menu"
  | "message"
  | "modes"
  | "play"
  | "shield"
  | "spark"
  | "supplier"
  | "training"
  | "voice"
  | "windows"
  | "workflow"
  | "x";

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className = "h-5 w-5" }: IconProps) {
  const common = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  switch (name) {
    case "arrow":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "automation":
      return <svg {...common}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="4" /></svg>;
    case "camera":
      return <svg {...common}><path d="M4 7h4l1.5-2h5L16 7h4v11H4z" /><circle cx="12" cy="12.5" r="3" /></svg>;
    case "catalog":
      return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5zM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" /></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    case "connected":
      return <svg {...common}><path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0M11 18.5a2 2 0 0 1 2 0" /></svg>;
    case "dashboard":
      return <svg {...common}><rect x="3" y="3" width="7" height="8" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="15" width="7" height="6" rx="1" /></svg>;
    case "download":
      return <svg {...common}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>;
    case "license":
      return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h5M9 17l2 2 4-4" /></svg>;
    case "lock":
      return <svg {...common}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
    case "memory":
      return <svg {...common}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3M10 10h4v4h-4z" /></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "message":
      return <svg {...common}><path d="M20 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A7 7 0 0 1 3 13V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" /><path d="M8 9h8M8 13h5" /></svg>;
    case "modes":
      return <svg {...common}><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>;
    case "play":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3 4 6v5c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>;
    case "spark":
      return <svg {...common}><path d="m12 3 1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8zM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></svg>;
    case "supplier":
      return <svg {...common}><path d="M3 9h18v11H3zM5 9l2-5h10l2 5M8 20v-6h8v6" /><path d="M3 9a3 3 0 0 0 5 2 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5-2" /></svg>;
    case "training":
      return <svg {...common}><path d="m3 9 9-5 9 5-9 5z" /><path d="M7 12v5c3 2 7 2 10 0v-5M21 9v6" /></svg>;
    case "voice":
      return <svg {...common}><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></svg>;
    case "windows":
      return <svg {...common}><path d="m3 5 8-1v8H3zM13 3.8 21 3v9h-8zM3 14h8v8l-8-1zM13 14h8v7l-8 1z" /></svg>;
    case "workflow":
      return <svg {...common}><rect x="3" y="4" width="6" height="5" rx="1" /><rect x="15" y="15" width="6" height="5" rx="1" /><path d="M9 6.5h4a3 3 0 0 1 3 3V15M15 17.5h-4a3 3 0 0 1-3-3V9" /></svg>;
    case "x":
      return <svg {...common}><path d="M5 5l14 14M19 5 5 19" /></svg>;
  }
}
