"use client";
import { BASE_URL } from "@/config";
import { useQuery } from "@apollo/client";
import { GET_CLASSES } from "@/graphql/queries/classQueries";
import Link from "next/link";
import DeleteClassButton from "./DeleteClassButton";
import { Button } from "./ui/button";

type ClassProps = { id: string; name: string; status: string };

export default function Classes() {
  const { loading, error, data } = useQuery(GET_CLASSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong. Error: {error.message}</p>;

  return (
    <div>
      <h1>Available Classes</h1>

      {data?.classes.length > 0 ? (
        <div className="grid gap-y-5">
          {data.classes.map(({ id, name, status }: ClassProps) => (
            <ClassCard id={id} name={name} status={status} />
          ))}
        </div>
      ) : (
        <p>No Classes yet</p>
      )}
    </div>
  );
}

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ClassCard({ id, name, status }: ClassProps) {
  let badgeColour = "bg-blue-100 border border-blue-600 text-blue-600";

  switch (status) {
    case "Coming Soon":
      badgeColour = "bg-green-100 border border-green-600 text-green-600";
      break;
    case "Enrolment":
      badgeColour = "bg-amber-100 border border-amber-600 text-amber-600";
      break;
    default:
      break;
  }

  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <p className={`rounded-3xl hover:none ${badgeColour} min-w-20 w-fit px-4 text-center text-md`}>{status}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href={`${BASE_URL}/class/${id}`}>View</Link>
        </Button>
      </CardContent>
      <CardFooter>
        <DeleteClassButton classId={id} />
      </CardFooter>
    </Card>
  );
}
