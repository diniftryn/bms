import { MouseEventHandler } from "react";

import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";

type DeleteButtonProps = {
  name: String[];
  deletePromise: any;
  deleteId: String;
};

export default function DeleteButton({ name, deletePromise, deleteId }: DeleteButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const handleDelete: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    const promise = deletePromise({
      variables: {
        id: deleteId
      }
    });

    toast.promise(promise, {
      success: {
        title: "Successful",
        description: `${name[1]} successfully deleted.`,
        duration: 2000,
        isClosable: true
      },
      error: {
        title: "Error",
        description: `Could not delete ${name[0]}.`,
        duration: 2000,
        isClosable: true
      },
      loading: {
        title: `Deleting ${name[0]}...`,
        description: "Please do not close the page.",
        isClosable: false
      }
    });
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete {name[1]}
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {name[1]}
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Confirm Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
