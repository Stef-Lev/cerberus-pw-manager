import { Box, Spinner, Center } from "@chakra-ui/react";

function Loader() {
  return (
    <Box>
      <Center height="50vh">
        <Spinner
          thickness="8px"
          speed="1s"
          emptyColor="teal.200"
          color="teal.600"
          size="xl"
        />
      </Center>
    </Box>
  );
}

export default Loader;
