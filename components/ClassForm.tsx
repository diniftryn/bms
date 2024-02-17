"use client";
import { ADD_CLASS } from "@/graphql/mutations/classMutations";
import { GET_CLASSES } from "@/graphql/queries/classQueries";
import { GET_INSTRUCTORS } from "@/graphql/queries/instructorQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";

export default function ClassForm() {
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
            <Label>Name</Label>
            <Input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

            <Label>Description</Label>
            <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)}></Textarea>

            <Label>Status</Label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <Select value={status}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Coming Soon">
                      <option value="Coming Soon">Coming Soon</option>
                    </SelectItem>

                    <SelectItem value="Enrolment">Enrolment</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </select>

            <Label>Instructor</Label>
            {/* <select className="border" id="instructorId" value={instructorId} onChange={e => setInstructorId(e.target.value)}>
              <SelectItem value="">Select Instructor</SelectItem>
              {data.instructors.map((instructor: { id: string; name: string }) => (
                <SelectItem key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </SelectItem>
              ))}
            </select> */}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  );
}
