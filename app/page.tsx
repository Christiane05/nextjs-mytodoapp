//"use client"
import './globals.css'; // Vérifie que c'est bien ce fichier où tu as les directives Tailwind
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Dashboard from "@/components/ui/dashboard";



export default async function Home() {
  //const [refreshStats, setRefreshStats] = useState(0);

   const session = await getServerSession(authOptions);

  if (!session) {
     // Redirige vers la page de login si pas connecté
    redirect("/login");
  }
  
  return <Dashboard session={session} />;
}