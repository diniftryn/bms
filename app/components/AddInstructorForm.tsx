"use client";
import { ADD_INSTRUCTOR } from "@/graphql/mutations/instructorMutations";
import { GET_INSTRUCTORS } from "@/graphql/queries/instructorQueries";
import { useMutation } from "@apollo/client";
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
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-2">
        <label>Name</label>
        <input className="border" type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

        <label>Phone</label>
        <input className="border" type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />

        <label>Email</label>
        <input className="border" type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
