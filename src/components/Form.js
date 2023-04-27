import { Box, Flex, Heading, VStack, Center } from "@chakra-ui/react";
import Button from "./Button";
import Input from "./Input";

function Form({
  title,
  inputs,
  buttonText,
  onButtonClick,
  onChange,
  state,
  error,
}) {
  return (
    <Box>
      <Flex flexDirection="column">
        <Center>
          <Heading as="h3" fontSize="20px" mb="20px">
            {title}
          </Heading>
        </Center>

        <VStack mb="20px">
          {inputs.map((item) => (
            <Input
              key={item.placeholder}
              type={item.type}
              placeholder={item.placeholder}
              errorBorderColor="red.200"
              value={state?.[item.id] || ""}
              onChange={(e) => onChange(e, item.id)}
              isRequired
            />
          ))}
        </VStack>

        <Button type="primary" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Flex>
    </Box>
  );
}

export default Form;
