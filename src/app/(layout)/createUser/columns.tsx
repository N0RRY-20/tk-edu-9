"use client";

import { ColumnDef } from "@tanstack/react-table";

import { UserWithRole } from "better-auth/plugins";

import { UserActions } from "./partials/userAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "createdAt",
    header: " Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
