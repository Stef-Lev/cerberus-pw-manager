import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import useDisclaimer from "@/hooks/useDisclaimer";

const DisclaimerModal = () => {
  const { showDisclaimer, handleCloseDisclaimer } = useDisclaimer();
  return (
    <Modal isCentered isOpen={showDisclaimer} onClose={handleCloseDisclaimer}>
      <ModalOverlay />
      <ModalContent w="90%" fontSize="22px" textAlign="center">
        <ModalHeader fontSize="24px" px="20px" pt="20px" pb="0px">
          Disclaimer
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p="20px">
          This project was created for educational purposes only, please do not
          use it to store sensitive personal information.
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DisclaimerModal;
