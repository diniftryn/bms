"use client";
import { BASE_URL } from "@/config";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLASSES } from "@/graphql/queries/classQueries";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { DELETE_CLASS } from "@/graphql/mutations/classMutations";
import { Badge, Button, Card } from "@chakra-ui/react";

export default function Classes() {
  const { loading, error, data } = useQuery(GET_CLASSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong. Error: {error.message}</p>;

  return (
    <div className="p-5">
      <p className="text-2xl font-bold">Our Classes</p>
      <p className="pb-5">This page shows a list of all our classes. Search or filter for a specific class.</p>

      {data?.classes.length > 0 ? (
        <div>
          {data.classes.map(({ id, name, status }: { id: string; name: string; status: string }) => (
            <Card key={id} className="p-5 lg:max-w-[50vw] gap-y-2">
              <p className="text-lg font-semibold">{name}</p>
              <Badge ml="1" fontSize="0.8em" colorScheme="green">
                {status}
              </Badge>

              <Button colorScheme="blue">
                <Link href={`${BASE_URL}/class/${id}`}>View</Link>
              </Button>

              <DeleteClassButton classId={id} />
            </Card>
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
