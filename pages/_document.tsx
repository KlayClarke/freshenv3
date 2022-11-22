import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <Script src="https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.js" />
        <NextScript />
      </body>
    </Html>
  );
}
