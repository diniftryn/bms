import Link from "next/link";

export default function Home() {
  const cards = [1, 2, 3, 4];
  return (
    <main>
      <section>
        <h1>My Upcoming Classes</h1>
        <p>
          You have no upcoming classes. Choose a class <Link href="/class">here</Link> and book to start skating!
        </p>
      </section>

      <section className="pt-10">
        <h1>Recommended Classes</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-4">
          {cards.map(item => (
            <RecommendedClassCard key={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function RecommendedClassCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Name</CardTitle>
        <CardDescription>Class Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Date</p>
      </CardContent>
      <CardFooter>
        <p>Book</p>
      </CardFooter>
    </Card>
  );
}
