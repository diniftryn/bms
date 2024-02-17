"use client";
import DeleteClassButton from "@/components/DeleteClassButton";
import { BASE_URL } from "@/config";
import { GET_CLASS } from "@/graphql/queries/classQueries";
import { useQuery } from "@apollo/client";
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
        <div className="mx-auto w-75 card p-5">
          <Link href="/" className="border-b border-b-black">
            Back
          </Link>

          <p className="text-xl font-semibold py-5">{data.class.name}</p>
          <p>{data.class.description}</p>

          <p className="">Class Status</p>
          <p className="">{data.class.status}</p>

          <InstructorInfo instructor={data.class.instructor} />

          <Link href={`${BASE_URL}/class/${id}/edit`}>Edit</Link>
        </div>
      )}
    </>
  );
}

function InstructorInfo({ instructor }: { instructor: { name: string; phone: string; email: string } }) {
  return (
    <div>
      <h1>Class Instructor: {instructor?.name}</h1>
      <h2>
        {instructor?.phone} {instructor?.email}
      </h2>
    </div>
  );
}
