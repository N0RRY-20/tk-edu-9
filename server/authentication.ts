"use server";
import { auth } from "@/lib/auth";

export const signin = async (email: string, password: string) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    if (result) {
      return {
        success: true,
        message: "Sign in successfully",
      };
    }
  } catch (error) {
    console.error("Signin error:", error);
    return {
      success: false,
      message: "Sign in failed due to server error",
    };
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    if (result) {
      return {
        success: true,
        message: "Sign up successfully",
      };
    }
  } catch (error) {
    // jika error internal (bukan dari API)
    console.error("Signup error:", error);
    return {
      success: false,
      message: "Sign up failed due to server error",
    };
  }
};
