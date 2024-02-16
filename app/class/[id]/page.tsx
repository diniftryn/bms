"use client";
import { BASE_URL } from "@/config";
import { GET_CLASS } from "@/graphql/queries/classQueries";
import { useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default function Class({ params: { id } }: Props) {
  const { loading, error, data } = useQuery(GET_CLASS, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="p-5 gap-10">
          <p className="text-xl font-semibold py-5">{data.class.name}</p>
          <p>{data.class.description}</p>

          <p className="">Class Status</p>
          <p className="">{data.class.status}</p>

          <InstructorInfo instructor={data.class.instructor} />

          <Link href={`${BASE_URL}/class/${id}/edit`}>
            <Button colorScheme="blue">Edit</Button>
          </Link>
        </div>
      )}
    </>
  );
}

function InstructorInfo({ instructor }: { instructor: { name: string; phone: string; email: string } }) {
  return (
    <div className="py-5">
      <p>Class Instructor: {instructor?.name}</p>
      <p>Phone: {instructor?.phone}</p>
      <p>Email: {instructor?.email}</p>
    </div>
  );
}
