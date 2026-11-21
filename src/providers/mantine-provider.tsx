"use client";

import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: "blue",
  primaryShade: 7,
  fontFamily: "Inter, Arial, sans-serif",
  headings: { fontFamily: "Inter, Arial, sans-serif" },
  defaultRadius: "md",
});

export function AppMantineProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <MantineProvider theme={theme} defaultColorScheme="light">{children}</MantineProvider>;
}

export { AppMantineProvider as MantineProvider };
