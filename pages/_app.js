import Layout from "../components/layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
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
