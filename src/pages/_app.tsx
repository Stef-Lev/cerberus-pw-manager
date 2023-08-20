import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "theme";
import Layout from "@/components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DisclaimerModal from "@/components/DisclaimerModal";

// TODO: Update readme with images
// TODO: Warning Modal to not use confidential data

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
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
