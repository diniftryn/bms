"use client";
import { useMutation, useQuery } from "@apollo/client";
import { GET_INSTRUCTORS } from "@/graphql/queries/instructorQueries";
import { DELETE_INSTRUCTOR } from "@/graphql/mutations/instructorMutations";
import DeleteButton from "./DeleteButton";

export default function Instructors() {
  const { loading, error, data } = useQuery(GET_INSTRUCTORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong. Error: {error.message}</p>;

  return (
    <div className="p-5">
      <h1>Our Instructors</h1>
      <p>All our instructors are highly skilled and have more than 5 years of experience in skateboarding.</p>

      {data?.instructors.length > 0 ? (
        <div>
          {data.instructors.map(({ id, name, phone, email }: { id: string; name: string; phone: string; email: string }) => (
            <div key={id}>
              <p>Name of Instructor: {name}</p>
              <p>Phone: {phone}</p>

              <p>Email: {email}</p>

              <DeleteInstructorButton instructorId={id} />
            </div>
          ))}
        </div>
      ) : (
        <p>No Instructors</p>
      )}
    </div>
  );
}

function DeleteInstructorButton({ instructorId }: { instructorId: string }) {
  const [deleteInstructor] = useMutation(DELETE_INSTRUCTOR, {
    variables: { id: instructorId },
    refetchQueries: [{ query: GET_INSTRUCTORS }]
  });

  return <DeleteButton name={["instructor", "Instructor"]} deletePromise={deleteInstructor} deleteId={instructorId} />;
}
