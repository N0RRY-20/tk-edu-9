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
}: {
  email: string;
  password: string;
  name: string;
  role: ("admin" | "guru" | "walimurid")[];
}) => {
  try {
    const newUser = await auth.api.createUser({
      body: {
        email, // required
        password, // required
        name, // required
        role,
      },
    });
    if (newUser) {
      return {
        success: true,
        message: "User created successfully",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "User creation failed",
    };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const result = await auth.api.removeUser({
      body: {
        userId, // required
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    if (result) {
      return {
        success: true,
        message: "User deleted successfully",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "User deletion failed",
    };
  }
};
