import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "theme";
import Layout from "@/components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;