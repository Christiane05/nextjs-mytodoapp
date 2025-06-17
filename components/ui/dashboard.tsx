
"use client";

import { useState } from "react";
import TasksPage from "@/app/tasks/page";
import PieChart from "@/horizon-tailwind-react/src/components/charts/PieChart";
import { StatsTest } from "@/components/ui/stats";
import LogoutButton from "@/components/ui/logoutbutton";
import { Menu } from "@/components/ui/menu";
import Image from "next/image";
import '../../app/globals.css'; // Vérifie que c'est bien ce fichier où tu as les directives Tailwind

export default function Dashboard({ session }: { session: any }) {
  const [refreshStats, setRefreshStats] = useState(0);

  return (
    <div className=" p-2 m-4 gap-16 bg-background text-foreground"> 
      <div className="w-full m-2 p-5">
        <Menu session={session}/>
        
      </div>
      <div className="w-full m-2 p-20 ">
        <TasksPage session={session}/>
      </div>
      
      <footer className="text-sm text-gray-500 text-center mt-10 pb-4">
          <div>
            © 2025 — Développé par <span className="font-semibold">Heidi</span>
          </div>
          <div className="mt-1">
            <a href="https://github.com/tonprofil" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">
              Voir le code sur GitHub
            </a>
          </div>
      </footer>

    </div>
  );
}

   