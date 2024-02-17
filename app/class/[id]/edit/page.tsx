import EditClassForm from "@/components/EditClassForm";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function Edit({ params: { id } }: Props) {
  return <EditClassForm id={id} />;
}
