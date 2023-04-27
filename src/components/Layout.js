import Head from "next/head";
import ScrollToTop from "./ScrollToTop";
import { Container } from "@chakra-ui/react";
import BottomNav from "./BottomNav";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Cerberus</title>
        <meta name="description" content="Cerberus password manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="3xl" height="100vh" mb="90px">
        {children}
        <ScrollToTop />
      </Container>
      <BottomNav />
    </>
  );
}
