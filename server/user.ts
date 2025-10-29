"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getSession = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
};

export const CreateUser = async ({
  email,
  password,
  name,
  role,
  data,
}: {
  email: string;
  password: string;
  name: string;
  role: ("admin" | "guru" | "walimurid")[];
  data: Record<string, string>;
}) => {
  const newUser = await auth.api.createUser({
    body: {
      email, // required
      password, // required
      name, // required
      role,
      data,
    },
  });
  return newUser;
};
