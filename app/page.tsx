import Link from "next/link";
import Classes from "./components/Classes";
import { BASE_URL } from "@/config";
import Instructors from "./components/Instructors";
import { Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className="grid gap-5 p-5">
      <Link href={`${BASE_URL}/class/new`}>
        <Button colorScheme="blue">+ New Class</Button>
      </Link>
      <Link href={`${BASE_URL}/instructor/new`}>
        <Button colorScheme="teal">+ New Instructor</Button>
      </Link>

      <Link href={`${BASE_URL}/class`}>View All Classes</Link>

      <Link href={`${BASE_URL}/instructor`}>View All Instructors</Link>
    </main>
  );
}
