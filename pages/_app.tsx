import { SessionProvider } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "../styles/rating_stars.css";
import "../styles/globals.css";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import Layout from "../components/Layout/Layout";
import AuthWrapper from "../components/Auth/AuthWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <AuthWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthWrapper>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
