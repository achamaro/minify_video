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
    <html lang="ja">
      <head>
        {process.env.NODE_ENV === "production" && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8949303413724798"
            crossOrigin="anonymous"
          ></script>
        )}
      </head>
      <body className={cn(MPlus.className, "font-light")}>{children}</body>
    </html>
  );
}
