"use client";
import { DELETE_INSTRUCTOR } from "@/graphql/mutations/instructorMutations";
import { GET_INSTRUCTORS } from "@/graphql/queries/instructorQueries";
import { useMutation } from "@apollo/client";
import { MouseEventHandler } from "react";

export default function DeleteInstructorButton({ instructorId }: { instructorId: string }) {
  const [deleteInstructor] = useMutation(DELETE_INSTRUCTOR, {
    variables: { id: instructorId },
    refetchQueries: [{ query: GET_INSTRUCTORS }]
  });

  const handleDelete: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    deleteInstructor({
      variables: {
        id: instructorId
      }
    });
  };

  return <button onClick={handleDelete}>Delete Instructor</button>;
}
