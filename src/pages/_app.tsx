import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import theme from "theme";
import Layout from "@/components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DisclaimerModal from "@/components/DisclaimerModal";

// TODO: Add toast if saved successfully

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Cerberus</title>
          <meta name="title" property="og:title" content="Cerberus"></meta>
          <meta property="og:image" content="/preview.png" />
          <meta
            property="og:description"
            content="Simplify your digital life with Cerberus, a minimalistic password manager built with NextJS, Typescript and ChakraUI"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
          <DisclaimerModal />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;
