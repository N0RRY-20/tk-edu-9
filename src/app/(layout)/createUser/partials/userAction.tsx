"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { deleteUser } from "../../../../../server/user";
import { UserWithRole } from "better-auth/plugins";
import { UpdateUserForm } from "@/components/crud-form/update-user-form";

export function UserActions({ user }: { user: UserWithRole }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(`Yakin ingin menghapus user: ${user.name}?`);
    if (!confirmed) return;

    const result = await deleteUser(user.id);
    alert(result?.message);

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(user.id)}
        >
          Copy User ID
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <UpdateUserForm user={user} />
        <DropdownMenuItem onClick={handleDelete}>Delete User</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
