import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import passwordChecker from "@/helpers/passwordChecker";
import generatePassword from "@/helpers/generatePassword";
import {
  IPasswordEditorProps,
  IAutoGenerateOptions,
  ICheckResult,
} from "@/types/components";

const PasswordEditor: React.FC<IPasswordEditorProps> = ({
  password,
  setPassword,
}) => {
  const [check, setCheck] = useState<ICheckResult>({});
  const [autoGenerateOptions, setAutoGenerateOptions] =
    useState<IAutoGenerateOptions>({
      length: 10,
      numbers: false,
      symbols: false,
      lower: true,
      upper: false,
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (password) {
      setCheck(passwordChecker(e.target.value));
    } else {
      setCheck({});
    }
    setPassword(e.target.value);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoGenerateOptions((prevState) => ({
      ...prevState,
      [e.currentTarget.id]: e.currentTarget.checked,
    }));
  };

  const handleSlider = (val: number) => {
    setAutoGenerateOptions((prevState) => ({
      ...prevState,
      length: val,
    }));
  };

  const passWordGeneration = () => {
    let pw = generatePassword(autoGenerateOptions);
    setCheck(passwordChecker(pw));
    setPassword(pw);
  };

  useEffect(() => {
    if (password) {
      setCheck(passwordChecker(password));
    } else {
      setCheck({});
    }

    return () => {
      setCheck({});
    };
  }, [password]);

  return (
    <Box py="10px">
      <Heading as="h4" textAlign="center" mb="10px" fontSize="18px">
        Password
      </Heading>
      <InputGroup>
        <Input
          w="100%"
          value={password}
          onChange={handleInputChange}
          _focusVisible={{ border: "2px solid", borderColor: "teal.200" }}
        />
        <InputRightElement>
          <FiRefreshCw onClick={passWordGeneration} />
        </InputRightElement>
      </InputGroup>
      <Box my="10px" h="8px" w="100%" bg="gray.800" borderRadius="0.375rem">
        <Box
          h="8px"
          w={check.percent || "0%"}
          bg={check.color || "transparent"}
          borderRadius="0.375rem"
        ></Box>
      </Box>

      <Box>
        <Grid gridTemplateColumns="1fr 1fr" gap="16px" py="16px">
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Box>Length</Box>
              <Box>{autoGenerateOptions.length}</Box>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Slider
                aria-label="slider-ex-1"
                value={autoGenerateOptions.length}
                min={0}
                max={32}
                onChange={handleSlider}
              >
                <SliderTrack>
                  <SliderFilledTrack bg="teal.200" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Box>Numbers</Box>
              <Box>
                <Checkbox
                  id="numbers"
                  isChecked={autoGenerateOptions.numbers}
                  colorScheme="teal"
                  onChange={handleCheckbox}
                />
              </Box>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Box>Symbols</Box>
              <Box>
                <Checkbox
                  id="symbols"
                  isChecked={autoGenerateOptions.symbols}
                  colorScheme="teal"
                  onChange={handleCheckbox}
                />
              </Box>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Box>Lowercase</Box>
              <Box>
                <Checkbox
                  id="lower"
                  isChecked={autoGenerateOptions.lower}
                  colorScheme="teal"
                  onChange={handleCheckbox}
                />
              </Box>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10">
            <Flex align="center" h="100%" justifyContent="space-between">
              <Box>Uppercase</Box>
              <Box>
                <Checkbox
                  id="upper"
                  isChecked={autoGenerateOptions.upper}
                  colorScheme="teal"
                  onChange={handleCheckbox}
                />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default PasswordEditor;
