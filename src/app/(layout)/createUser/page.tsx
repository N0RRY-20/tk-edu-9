import { headers } from "next/headers";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { auth } from "@/lib/auth";
import { User } from "better-auth";
import { DialogCloseButton } from "@/components/crud-form/create-user-form";

const now = Date.now();
export default async function DemoPage() {
  const response = await auth.api.listUsers({
    query: {
      offset: 0,
      limit: 30,
      sortBy: "name",
      sortDirection: "asc",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  if (!response) {
    return <p>Gagal memuat data.</p>;
  }
  const users: User[] = (response?.users || []).map((u) => ({
    id: u.id ?? "unknown-id", // tambahkan id
    name: u.name ?? "Unknown",
    email: u.email ?? "-",
    emailVerified: u.emailVerified ?? false,
    image: u.image ?? null,
    createdAt: new Date(u.createdAt),
    updatedAt: new Date(u.updatedAt ?? now), // tambahkan updatedAt
  }));
  //   const users = response.users;

  console.log(users);
  return (
    <div className="container mx-auto py-10">
      <DialogCloseButton />
      <DataTable columns={columns} data={users} />
    </div>
  );
}
