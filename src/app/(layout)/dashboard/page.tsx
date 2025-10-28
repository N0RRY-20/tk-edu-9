"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
        {/* Skeleton untuk judul */}
        <Skeleton className="h-8 w-64 rounded-md" />

        {/* Skeleton untuk teks sambutan */}
        <Skeleton className="h-4 w-40 rounded-md" />

        {/* Skeleton untuk tombol */}
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    );
  if (error) return <p>Error loading session.</p>;

  const handleSignOut = async () => {
    setIsLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Welcome to Dashboard</h1>
      <p>hello {session?.user.name}</p>
      <Button onClick={handleSignOut} className="mt-4" disabled={isLoading}>
        {isLoading ? <Spinner /> : "Sign Out"}
      </Button>
      <Button onClick={() => router.push("/dashboard2")} className="mt-4">
        Go to Work
      </Button>
    </div>
  );
}
