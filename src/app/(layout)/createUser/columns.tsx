"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "better-auth";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "createdAt",
    header: " Created At",
  },
];
