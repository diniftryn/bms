"use client";
import { BASE_URL } from "@/config";
import { useQuery } from "@apollo/client";
import { GET_CLASSES } from "@/graphql/queries/classQueries";
import Link from "next/link";
import DeleteClassButton from "./DeleteClassButton";
import { Button } from "./ui/button";

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

              <Button asChild>
                <Link href={`${BASE_URL}/class/${id}`}>View</Link>
              </Button>

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
