import { SessionProvider } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "../styles/rating_stars.css";
import "../styles/globals.css";

import Layout from "../components/layout";
import AuthWrapper from "../components/AuthWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthWrapper>
    </SessionProvider>
  );
}

export default MyApp;
