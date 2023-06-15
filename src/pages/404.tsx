import { Box, Flex, useBreakpointValue, Text, Heading } from "@chakra-ui/react";
import Button from "@/components/Button";
import Icon404 from "@/components/Icon404";
import { useRouter } from "next/router";

const page404 = () => {
  const iconSize = useBreakpointValue({ base: 320, sm: 360, md: 440 });
  const router = useRouter();
  return (
    <Box pt="60px">
      <Flex alignItems="center" flexDirection="column">
        <Heading fontSize={32} mb="16px">
          Error
        </Heading>
        <Icon404 sideSize={iconSize} />
        <Text fontSize={26} mt="16px">
          Page not found
        </Text>
        <Button
          buttonType="primary"
          marginTop="16px"
          onClick={() => router.push("/")}
        >
          Go back home
        </Button>
      </Flex>
    </Box>
  );
};

export default page404;
