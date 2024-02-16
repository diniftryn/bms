"use client";
import { BASE_URL } from "@/config";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLASSES } from "@/graphql/queries/classQueries";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { DELETE_CLASS } from "@/graphql/mutations/classMutations";

export default function Classes() {
  const { loading, error, data } = useQuery(GET_CLASSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong. Error: {error.message}</p>;

  return (
    <div>
      {data?.classes.length > 0 ? (
        <div>
          {data.classes.map(({ id, name, description, status }: { id: string; name: string; description: string; status: string }) => (
            <div key={id}>
              <h3>{name}</h3>
              <p>{description}</p>

              <p>{status}</p>

              <Link href={`${BASE_URL}/class/${id}`}>View</Link>

              <DeleteClassButton classId={id} />
            </div>
          ))}
        </div>
      ) : (
        <p>No Classes yet</p>
      )}
    </div>
  );
}

function DeleteClassButton({ classId }: { classId: string }) {
  const [deleteClass] = useMutation(DELETE_CLASS, {
    variables: { id: classId },
    refetchQueries: [{ query: GET_CLASSES }]
  });

  return <DeleteButton name={["class", "Class"]} deletePromise={deleteClass} deleteId={classId} />;
}
