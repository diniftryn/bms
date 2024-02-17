"use client";
import DeleteClassButton from "@/components/DeleteClassButton";
import { Button } from "@/components/ui/button";
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
        <section>
          <h1>{data.class.name}</h1>
          <h2>{data.class.description}</h2>

          <p>Class Status: {data.class.status}</p>

          <p>Class Instructor: {data.class.instructor.name}</p>

          <div className="py-5 flex gap-x-2 mb-10">
            <Button asChild>
              <Link href={`${BASE_URL}/class/${id}/edit`}>Edit</Link>
            </Button>
            <DeleteClassButton classId={id} />
          </div>

          <div className="bg-purple-100 p-5">
            <h2>Have Questions about this class?</h2>
            <Link href="/">Email Instructor here</Link>
          </div>
        </section>
      )}
    </>
  );
}
