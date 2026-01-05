"use client";

import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClient();
  const isDisabled =
    name.length === 0 || email.length === 0 || password.length === 0;

  const handleBack = () => router.push("/login");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });

    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }

    alert("Check your email for confirmation!");
    handleBack();
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 p-8">
        <h1 className="text-2xl font-bold">Vinyl Vault - Sign Up</h1>
        <input
          type="name"
          placeholder="Name"
          className="w-full rounded border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSignUp}
            disabled={isDisabled}
            className={`rounded ${
              isDisabled ? "bg-green-100" : "bg-green-500"
            } px-4 py-2 text-white`}
          >
            Sign Up
          </button>
          <button
            onClick={handleBack}
            className={`rounded bg-blue-500 px-4 py-2 text-white`}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
