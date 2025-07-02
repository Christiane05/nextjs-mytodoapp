// app/page.tsx
import Link from "next/link";
import Dashboard from "./dashboard";

export default async function Landingpagehead() {
    const msg = "Hello, world";

  return (
      <header className="mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Ma To-Do Application
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Gérez vos tâches facilement, organisez votre journée et boostez votre productivité.
        </p>
      </header>
  )
}
