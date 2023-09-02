import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </Head>
      <body>
        <Script
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
          src="/mathjax/es5/tex-mml-chtml.js"
          strategy="beforeInteractive"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
