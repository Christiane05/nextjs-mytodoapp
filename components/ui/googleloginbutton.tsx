// components/GoogleLoginButton.tsx
"use client";

import { signIn } from "next-auth/react";

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="bg-white border border-gray-300 text-black py-2 px-4 rounded shadow hover:bg-gray-100"
    >
      Se connecter avec Google
    </button>
  );
}
