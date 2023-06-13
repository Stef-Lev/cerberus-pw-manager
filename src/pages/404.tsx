import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const page404 = () => {
  const router = useRouter();
  console.log(router.pathname);
  return <Box pt="60px">STEF</Box>;
};

export default page404;
