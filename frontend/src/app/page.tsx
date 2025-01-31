"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";

export default function Home() {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      router.push("/users");
    }
  }, [token, router]);

  return (
    <ProtectedRoute>
      <h1>Redirecting...</h1>
    </ProtectedRoute>
  );
}