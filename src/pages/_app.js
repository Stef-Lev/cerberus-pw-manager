import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "theme";
import Layout from "@/components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loader from "@/components/Loader";

function App({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router && router.events) {
      router.events.on("routeChangeStart", () => setLoading(true));
      router.events.on("routeChangeComplete", () => setLoading(false));
      router.events.on("routeChangeError", () => setLoading(false));
    }
    return () => {
      if (router && router.events) {
        router.events.off("routeChangeStart", () => setLoading(true));
        router.events.off("routeChangeComplete", () => setLoading(false));
        router.events.off("routeChangeError", () => setLoading(false));
      }
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        {loading ? (
          <Loader />
        ) : (
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        )}
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;
