// app/page.tsx
import Link from "next/link";
import Dashboard from "./dashboard";

export default async function Landingpagecontent() {

  return (   
    <div>
        <section className="mt-6 max-w-3xl text-left">
            <h2 className="text-2xl font-bold mb-4">Pourquoi choisir notre application ?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Interface simple et intuitive</li>
            <li>Synchronisation automatique de vos tâches</li>
            <li>Disponible partout, sur tous vos appareils</li>
            <li>Sécurité et confidentialité garanties</li>
            </ul>
        </section>
    </div>
  )
}
