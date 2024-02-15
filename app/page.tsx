import Link from "next/link";
import Classes from "./components/Classes";
import { BASE_URL } from "@/config";
import Instructors from "./components/Instructors";

export default function Home() {
  return (
    <main>
      <Link href={`${BASE_URL}/class/new`}>+ New Class</Link>
      <Link href={`${BASE_URL}/instructor/new`}>+ New Instructor</Link>

      <Link href={`${BASE_URL}/class`}>View All Classes</Link>

      <Link href={`${BASE_URL}/instructor`}>View All Instructors</Link>
    </main>
  );
}
