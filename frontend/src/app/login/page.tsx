"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login, token } = useAuth();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      router.push("/users");
    }
  }, [token, router]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
