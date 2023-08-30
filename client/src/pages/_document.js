import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <script
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
        ></script>
        <script
          type="text/javascript"
          id="MathJax-script"
          async
          src="/mathjax/es5/tex-mml-chtml.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
