import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { Toaster } from "sonner";

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
        {/* <link rel="icon" href="favicon.ico" sizes="32x32" /> */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        /> */}
      </head>
      <body
        className={
          workSans.className +
          " " +
          workSansLocal.className +
          " px-4 lg:px-[15%] py-8 h-full w-full flex flex-col"
        }
      >
        <Navbar />
        {children}
        <Toaster richColors expand closeButton position="bottom-right" />
      </body>
    </html>
  );
}
