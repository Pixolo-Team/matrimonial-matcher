// REACT //
import { Suspense } from "react";
import React from "react";

// STYLES //
import "./globals.css";

// COMPONENTS //
import localFont from "next/font/local";

// DATA //
import type { Metadata } from "next";

// NEXT //

// FONTS //

// THEME //

// Fetch Fonts
const neometricFont = localFont({
  src: [
    {
      path: "../../public/fonts/neometric/neometric-hairline.woff",
      weight: "100",
      style: "hairline",
    },
    {
      path: "../../public/fonts/neometric/neometric-extra-light.woff",
      weight: "200",
      style: "extra-light",
    },
    {
      path: "../../public/fonts/neometric/neometric-light.woff",
      weight: "300",
      style: "light",
    },
    {
      path: "../../public/fonts/neometric/neometric-regular.woff",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/neometric/neometric-medium.woff",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../public/fonts/neometric/neometric-bold.woff",
      weight: "600",
      style: "bold",
    },
    {
      path: "../../public/fonts/neometric/neometric-extra-bold.woff",
      weight: "700",
      style: "extra-bold",
    },
    {
      path: "../../public/fonts/neometric/neometric-black.woff",
      weight: "800",
      style: "black",
    },
    {
      path: "../../public/fonts/neometric/neometric-heavy.woff",
      weight: "900",
      style: "heavy",
    },
  ],
  variable: "--font-neometric",
  display: "swap",
});

// Metadata //
export const metadata: Metadata = {
  title: "Configo – DevOps Control Center",
  description:
    "Configo simplifies infrastructure management with intuitive deployments, environment control, and cloud automation — all from a single, powerful dashboard.",
  icons: {
    icon: "/favicon.png", // ✅ Path relative to public/
  },
};

/** Root Layout */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${neometricFont.className} antialiased`}>
          {children}
      </body>
    </html>
  );
}
