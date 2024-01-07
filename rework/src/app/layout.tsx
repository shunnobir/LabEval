import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { Toaster } from "sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  fallback: ["sans-serf", "Arial"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Labeval",
  description: "",
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
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body
        className={
          roboto.className +
          " px-4 sm:px-[10%] py-8 h-full w-full flex flex-col"
        }
      >
        <Navbar />
        {children}
        <Toaster richColors expand closeButton position="bottom-right" />
      </body>
    </html>
  );
}
