// components/GoogleLoginButton.tsx
"use client";

import { signIn } from "next-auth/react";

export default function GoogleLoginButton() {
  
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/tasks" })}
      className=" bg-blue-700  border border-gray-300 text-gray-50 py-2 px-4 rounded shadow hover:bg-blue-400"
    >
      Se connecter avec Google
    </button>
  );
}
