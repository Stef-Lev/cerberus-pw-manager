import {
  Box,
  Flex,
  Center,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import passwordChecker from "../helpers/passwordChecker";
import { IRecordsSecurityProps } from "@/types/components";

const RecordsSecurity: React.FC<IRecordsSecurityProps> = ({ records }) => {
  const checkedRecords = records.map((item) => passwordChecker(item.password));
  const strong = checkedRecords.filter(
    (item) => item.text === "Strong" || item.text === "Very strong"
  ).length;
  const medium = checkedRecords.filter((item) => item.text === "Medium").length;
  const weak = checkedRecords.filter((item) => item.text === "Weak").length;
  const securityLevel = Math.round((strong / records.length) * 100);

  return (
    <Box py="20px">
      <Center>
        <CircularProgress
          size="120px"
          value={securityLevel}
          mb="10px"
          color="#35f57f"
        >
          <CircularProgressLabel>{securityLevel}%</CircularProgressLabel>
        </CircularProgress>
      </Center>
      <Center mb="20px">
        <Text>Security Level</Text>
      </Center>

      <Flex justifyContent="space-between">
        <Center
          border="1px solid #35f57f"
          borderRadius="8px"
          padding="10px"
          w="30%"
          flexDirection="column"
        >
          <Box fontSize="24px" fontWeight="bold" color="#35f57f">
            {strong}
          </Box>
          <Text fontSize="14px">Strong</Text>
        </Center>
        <Center
          border="1px solid #edc679"
          borderRadius="8px"
          padding="10px"
          w="30%"
          flexDirection="column"
        >
          <Box fontSize="24px" fontWeight="bold" color="#edc679">
            {medium}
          </Box>
          <Text fontSize="14px">Medium</Text>
        </Center>
        <Center
          border="1px solid #d63a47"
          borderRadius="8px"
          padding="10px"
          w="30%"
          flexDirection="column"
        >
          <Box fontSize="24px" fontWeight="bold" color="#d63a47">
            {weak}
          </Box>
          <Text fontSize="14px">Weak</Text>
        </Center>
      </Flex>
    </Box>
  );
};

export default RecordsSecurity;
