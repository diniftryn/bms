import { Instructor, Class } from "@prisma/client";

interface IClass extends Class {
  instructors: Instructor[];
}
