import { useState } from "react";
import { avatarsPositions } from "@/helpers/avatarPositions";
import {
  Box,
  Center,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Link,
  ModalCloseButton,
} from "@chakra-ui/react";
import Button from "./Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IAvatarSelectorProps } from "@/types/components";

const AvatarSelector: React.FC<IAvatarSelectorProps> = ({
  index,
  onSelect,
  modalOpen,
  setModalOpen,
}) => {
  const [avatarIndex, setAvatarIndex] = useState(index);

  const scrollAvatars = (direction) => {
    if (direction === "left") {
      if (avatarIndex === 0) {
        return;
      } else {
        setAvatarIndex((prevIndex) => prevIndex - 1);
      }
    }
    if (direction === "right") {
      if (avatarIndex === 23) {
        return;
      } else {
        setAvatarIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const setUserAvatar = () => {
    onSelect((prev) => ({ ...prev, avatar: avatarIndex }));
  };

  return (
    <Center>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent background="light.bg" color="light.color">
          <ModalHeader textAlign="center">Select your Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <FaAngleLeft
                  style={{ color: avatarIndex === 0 ? "#d6d6d6" : "#171923" }}
                  size="50px"
                  onClick={() => scrollAvatars("left")}
                />
              </Box>

              <Box
                backgroundImage="url('/avatars_n.jpg')"
                backgroundPosition={avatarsPositions[avatarIndex]}
                backgroundSize="2000px"
                width="200px"
                height="200px"
                border="3px solid #171923"
                borderRadius="full"
              />

              <Box>
                <FaAngleRight
                  style={{ color: avatarIndex === 23 ? "#d6d6d6" : "#171923" }}
                  size="50px"
                  onClick={() => scrollAvatars("right")}
                />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center">
            <Button
              buttonType="primary"
              colorScheme="teal"
              mr={3}
              onClick={() => {
                setUserAvatar();
                setModalOpen(false);
              }}
            >
              Select
            </Button>
          </ModalFooter>
          <Center pb="10px" fontStyle="italic">
            <Link
              color="teal.300"
              marginRight="6px"
              href="https://www.freepik.com/free-vector/round-avatars-set-with-faces-people-comic-portraits-happy-social-media-users_22676039.htm#query=avatar&position=3&from_view=keyword&track=sph"
            >
              Avatar Images by studio4rt
            </Link>
            on Freepik
          </Center>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default AvatarSelector;
