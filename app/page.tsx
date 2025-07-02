//"use client"
import './globals.css'; // Vérifie que c'est bien ce fichier où tu as les directives Tailwind
import { getServerSession } from "next-auth/next";
import { authOptions } from "./../lib/authOptions";
import { redirect } from "next/navigation";
import Dashboard from "@/components/ui/dashboard";
//import { useState } from 'react';
import Landingpagehead from '@/components/ui/landingpagehead';
import Landingpagecontent from '@/components/ui/landingpagecontent';
import GoogleLoginButton from '@/components/ui/googleloginbutton';
import Footer from '@/components/ui/footer';



export default async function Home() {
  //const [refreshStats, setRefreshStats] = useState(0);

   //const session = await getServerSession(authOptions);

 // if (!session) {
      //Redirige vers la page de login si pas connecté
 //   redirect("/login");
 // }
  
  return (
      <div>
        <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6 text-center m-6">
          <Landingpagehead/>
          <GoogleLoginButton />
          <Landingpagecontent/>
          <Footer/>
        </main>
        
        
      </div>
  )
    
}






  