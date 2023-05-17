import { Box, Spinner, Center, Text } from "@chakra-ui/react";

function Loader({ fullScreen, size = "xl", thickness = "8px", text = "" }) {
  return (
    <Box>
      <Center height={`${fullScreen ? "50vh" : "40px"}`}>
        {text && <Text mr="10px">{text}</Text>}
        <Spinner
          thickness={thickness}
          speed="1s"
          emptyColor="teal.200"
          color="teal.600"
          size={size}
        />
      </Center>
    </Box>
  );
}

export default Loader;
