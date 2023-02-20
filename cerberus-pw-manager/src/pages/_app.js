import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
