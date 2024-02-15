"use client";
import { UPDATE_CLASS } from "@/graphql/mutations/classMutations";
import { GET_CLASS } from "@/graphql/queries/classQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function EditClassForm({ id }: { id: string }) {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_CLASS, { variables: { id } });

  const skatingClass = data?.class;

  const [name, setName] = useState(skatingClass.name);
  const [description, setDescription] = useState(skatingClass.description);
  const [status, setStatus] = useState(() => {
    switch (skatingClass.status) {
      case "new":
        return "Coming Soon";
      case "progress":
        return "In Progress";
      case "enrolment":
        return "Enrolment";
      case "completed":
        return "Completed";
      default:
        throw new Error(`Unknown status: ${skatingClass.status}`);
    }
  });

  const [updateClass] = useMutation(UPDATE_CLASS, {
    variables: { id: skatingClass.id, name, description, status },
    refetchQueries: [{ query: GET_CLASS, variables: { id: skatingClass.id } }]
  });

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateClass({ variables: { id: skatingClass.id, name, description, status } });

    alert("Class details updated");

    router.push("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

            <label>Description</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>

            <label>Status</label>
            <select id="status" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="new">Coming Soon</option>
              <option value="enrolment">Enrolment</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button type="submit">Update</button>
        </form>
      )}
    </>
  );
}
