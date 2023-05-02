import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ScrollToTop from "./ScrollToTop";
import { Container } from "@chakra-ui/react";
import Loader from "./Loader";
import BottomNav from "./BottomNav";

export default function Layout({ children }) {
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
    <>
      <Head>
        <title>Cerberus</title>
        <meta name="description" content="Cerberus password manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <Container maxW="3xl" height="100vh" mb="90px">
          {children}
          <ScrollToTop />
        </Container>
      )}
      <BottomNav loading={loading} />
    </>
  );
}
