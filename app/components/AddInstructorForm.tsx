"use client";
import { ADD_INSTRUCTOR } from "@/graphql/mutations/instructorMutations";
import { GET_INSTRUCTORS } from "@/graphql/queries/instructorQueries";
import { useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function AddInstructorForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [addInstructor] = useMutation(ADD_INSTRUCTOR, {
    variables: { name, phone, email },
    refetchQueries: [{ query: GET_INSTRUCTORS }]
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      return alert("Please fill in all fields");
    }

    addInstructor({ variables: { name, phone, email, status } }).then(() => {
      setName("");
      setPhone("");
      setEmail("");
      router.push("/");
    });
  };

  return (
    <div className="grid justify-center items-center p-5">
      <p className="text-2xl font-bold pb-5">Add a New Instructor</p>
      <form onSubmit={handleSubmit} className="lg:max-w-[50vw]">
        <div className="grid grid-cols-2 gap-2">
          <label>Name</label>
          <Input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

          <label>Phone</label>
          <Input type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />

          <label>Email</label>
          <Input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
