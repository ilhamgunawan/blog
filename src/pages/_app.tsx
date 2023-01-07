import "normalize.css";
import { AppProps } from "next/app";
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../../public/styles/font.css";
import "../../public/styles/global.css";
import React from "react";
import NextNprogress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <NextNprogress
        color="#2c3e50"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </React.Fragment>
  );
}
