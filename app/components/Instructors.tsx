"use client";
import { BASE_URL } from "@/config";
import { useQuery } from "@apollo/client";
import { GET_INSTRUCTORS } from "@/graphql/queries/instructorQueries";
import Link from "next/link";
import DeleteInstructorButton from "./DeleteInstructorButton";

export default function Instructors() {
  const { loading, error, data } = useQuery(GET_INSTRUCTORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong. Error: {error.message}</p>;

  return (
    <div>
      {data?.instructors.length > 0 ? (
        <div>
          {data.instructors.map(({ id, name, phone, email }: { id: string; name: string; phone: string; email: string }) => (
            <div key={id}>
              <p>{id}</p>
              <p>{name}</p>
              <p>{phone}</p>

              <p>{email}</p>

              <DeleteInstructorButton instructorId={id} />
            </div>
          ))}
        </div>
      ) : (
        <p>No Classes yet</p>
      )}
    </div>
  );
}
