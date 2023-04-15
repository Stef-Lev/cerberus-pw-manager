import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "theme";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import authenticate from "@/middleware/authenticate";

function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      authenticate()(router.req, router.res, () => {});
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;
