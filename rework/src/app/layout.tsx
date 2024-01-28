import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/ThemeProvider";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["sans-serif", "Arial"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSansLocal = localFont({
  src: [{ path: "./fonts/WorkSans-VariableFont_wght.ttf", weight: "100 900" }],
});

export const metadata: Metadata = {
  title: "Labeval",
  description: "",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full h-full">
      <head>
        <Script
          id="MathJax"
          type="text/x-mathjax-config"
          dangerouslySetInnerHTML={{
            __html: `window.MathJax.Hub.Config({
              loader: { load: ["input/tex", "output/svg"] },
              tex: {
                inlineMath: [
                  ["\\(", "\\)"],
                ],
                displayMath: [
                  ["\\[", "\\]"],
                ],
                packages: {'[+]': ['color', 'array']},
              },
              CommonHTML: { matchFontHeight: false },
          });`,
          }}
          strategy="beforeInteractive"
        />
        <Script
          type="text/javascript"
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={
          workSans.className +
          " " +
          workSansLocal.className +
          " px-4 lg:px-[10%] py-8 h-full w-full flex flex-col font-[450] bg-white text-slate-700 dark:bg-zinc-950 dark:text-slate-300"
        }
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster richColors expand closeButton position="bottom-right" />
      </body>
    </html>
  );
}
