import "./globals.css";

import { cn } from "@/lib/cn";

import { MPlus } from "./font";

export const metadata = {
  title: "Minify Video",
  description: "このサービスは、動画をminifyしてサイズを縮小するサービスです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(MPlus.className, "font-light")}>{children}</body>
    </html>
  );
}
