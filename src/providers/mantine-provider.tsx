"use client";

import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: "blue",
  primaryShade: 6,
  colors: {
    blue: [
      "#EAF4FF",
      "#D5E9FF",
      "#ADD6FF",
      "#82C2FF",
      "#55B8FF",
      "#328FEF",
      "#1769E0",
      "#1256BD",
      "#0B3B75",
      "#082B55",
    ],
  },
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  headings: {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: "700",
  },
  defaultRadius: "md",
});

export function AppMantineProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}

export { AppMantineProvider as MantineProvider };
