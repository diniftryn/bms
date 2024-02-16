"use client";
import { DELETE_CLASS } from "@/graphql/mutations/classMutations";
import { GET_CLASSES } from "@/graphql/queries/classQueries";
import { useMutation } from "@apollo/client";
import { MouseEventHandler } from "react";

// import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, useDisclosure, useToast, AlertIcon } from "@chakra-ui/react";

export default function DeleteClassButton({ classId }: { classId: string }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const cancelRef = React.useRef();
  // const toast = useToast();

  const [deleteClass] = useMutation(DELETE_CLASS, {
    variables: { id: classId },
    refetchQueries: [{ query: GET_CLASSES }]
  });

  const handleDelete: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    deleteClass({
      variables: {
        id: classId
      }
    });

    // toast({
    //   title: "Successful",
    //   description: "Class successfully deleted.",
    //   status: "success",
    //   duration: 2000,
    //   isClosable: true
    // });
  };

  return (
    <button onClick={handleDelete}>Delete Class</button>
    // <>
    //   <Button colorScheme="red" onClick={onOpen}>
    //     Delete Class
    //   </Button>

    //   <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
    //     <AlertDialogOverlay>
    //       <AlertDialogContent>
    //         <AlertDialogHeader fontSize="lg" fontWeight="bold">
    //           Delete Class
    //         </AlertDialogHeader>

    //         <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

    //         <AlertDialogFooter>
    //           <Button ref={cancelRef} onClick={onClose}>
    //             Cancel
    //           </Button>
    //           <Button colorScheme="red" onClick={handleDelete} ml={3}>
    //             Confirm Delete
    //           </Button>
    //         </AlertDialogFooter>
    //       </AlertDialogContent>
    //     </AlertDialogOverlay>
    //   </AlertDialog>
    // </>
  );
}
