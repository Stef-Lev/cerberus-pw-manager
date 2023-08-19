import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import Button from "./Button";
import { useRef } from "react";

interface AlertModalProps {
  type: "delete" | "leave";
  isOpen: boolean;
  onClose: () => void;
  callBackAction: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  type,
  isOpen,
  onClose,
  callBackAction,
}) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const onClickCancelRef = () => {
    if (cancelRef.current) {
      cancelRef.current.click();
    }
  };
  const content = {
    delete: {
      body: "Are you sure you want to delete the record?",
      cancel: "Cancel",
      action: "Delete",
    },
    leave: {
      body: "You have unsaved changes, are you sure you want to leave the page?",
      cancel: "Cancel",
      action: "Leave page",
    },
  };
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent width="90%">
            <AlertDialogBody p="20px">{content[type]["body"]}</AlertDialogBody>

            <AlertDialogFooter justifyContent="center">
              <Button
                buttonType="transparent"
                width="50%"
                onClick={() => {
                  onClickCancelRef();
                  onClose();
                }}
              >
                {content[type]["cancel"]}
              </Button>
              <Button
                buttonType="error"
                width="50%"
                onClick={callBackAction}
                ml={3}
              >
                {content[type]["action"]}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertModal;
