import { createContext, useContext, ReactNode } from "react";

export interface MD3Theme {
  isDark: boolean;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  surface: string;
  surfaceVariant: string;
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  background: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  error: string;
  errorContainer: string;
  onError: string;
  onErrorContainer: string;
  scrim: string;
  e1: string;
  e2: string;
  e3: string;
}

export const LIGHT: MD3Theme = {
  isDark: false,
  primary: "#0061A4",        onPrimary: "#fff",
  primaryContainer: "#D1E4FF", onPrimaryContainer: "#001D36",
  secondary: "#3A6080",
  secondaryContainer: "#D4E4F4", onSecondaryContainer: "#0D1E2C",
  surface: "#F8F9FF",        surfaceVariant: "#DDE3EA",
  onSurface: "#191C1E",      onSurfaceVariant: "#41484D",
  outline: "#71787E",        outlineVariant: "#C1C7CE",
  background: "#EBEEf5",
  surfaceContainer: "#ECEEF5", surfaceContainerHigh: "#E6E8EF",
  error: "#B3261E",          errorContainer: "#FFDAD6",
  onError: "#fff",           onErrorContainer: "#410E0B",
  scrim: "rgba(0,0,0,0.32)",
  e1: "0 1px 2px rgba(0,0,0,0.2), 0 1px 3px 1px rgba(0,0,0,0.1)",
  e2: "0 1px 2px rgba(0,0,0,0.2), 0 2px 6px 2px rgba(0,0,0,0.1)",
  e3: "0 4px 8px 3px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.22)",
};

export const DARK: MD3Theme = {
  isDark: true,
  primary: "#9ECAFF",        onPrimary: "#003258",
  primaryContainer: "#00497D", onPrimaryContainer: "#D1E4FF",
  secondary: "#B0CAE3",
  secondaryContainer: "#243546", onSecondaryContainer: "#D4E4F4",
  surface: "#101418",        surfaceVariant: "#3E4449",
  onSurface: "#E1E2E9",      onSurfaceVariant: "#C1C7CD",
  outline: "#8B9197",        outlineVariant: "#3E4449",
  background: "#080C11",
  surfaceContainer: "#1D2024", surfaceContainerHigh: "#272B30",
  error: "#F2B8B5",          errorContainer: "#8C1D18",
  onError: "#601410",        onErrorContainer: "#F9DEDC",
  scrim: "rgba(0,0,0,0.6)",
  e1: "0 1px 2px rgba(0,0,0,0.5), 0 1px 3px 1px rgba(0,0,0,0.35)",
  e2: "0 1px 2px rgba(0,0,0,0.5), 0 2px 6px 2px rgba(0,0,0,0.35)",
  e3: "0 4px 8px 3px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.5)",
};

export const Ctx = createContext<MD3Theme>(LIGHT);
export const useT = () => useContext(Ctx);

export interface ThemeProviderProps {
  children: ReactNode;
  value: MD3Theme;
}
