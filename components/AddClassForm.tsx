"use client";
import { ADD_CLASS } from "@/graphql/mutations/classMutations";
import { GET_CLASSES } from "@/graphql/queries/classQueries";
import { GET_INSTRUCTORS } from "@/graphql/queries/instructorQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function AddClassForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [status, setStatus] = useState("new");

  const [addClass] = useMutation(ADD_CLASS, {
    variables: { name, description, instructorId, status },
    refetchQueries: [{ query: GET_CLASSES }]
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !status || !instructorId) {
      return alert("Please fill in all fields");
    }

    addClass({ variables: { name, description, instructorId, status } }).then(() => {
      setName("");
      setDescription("");
      setStatus("new");
      setInstructorId("");
      router.push("/");
    });
  };

  const { loading, error, data } = useQuery(GET_INSTRUCTORS);
  if (loading) return null;
  if (error) return "Something Went Wrong";

  return (
    <div>
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <label>Name</label>
            <input className="border" type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

            <label>Description</label>
            <textarea className="border" id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>

            <label>Status</label>
            <select className="border" id="status" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="new">Coming Soon</option>
              <option value="enrolment">Enrolment</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <label>Instructor</label>
            <select className="border" id="instructorId" value={instructorId} onChange={e => setInstructorId(e.target.value)}>
              <option value="">Select Instructor</option>
              {data.instructors.map((instructor: { id: string; name: string }) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
