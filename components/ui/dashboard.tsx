
//"use client";

//import { useState } from "react";
import TasksPage from "@/components/ui/taskpage";
import PieChart from "@/components/ui/piechart";
import { StatsTest } from "@/components/ui/stats";
import LogoutButton from "@/components/ui/logoutbutton";
import { Menu } from "@/components/ui/menu";
import Image from "next/image";
import '../../app/globals.css'; // Vérifie que c'est bien ce fichier où tu as les directives Tailwind


export default async function Dashboard({ session }: { session: any }) {
    //const [refreshStats, setRefreshStats] = useState(0);
   

  return (
    <div className=" p-2 m-4 gap-16 bg-background text-foreground"> 
      <div className="w-full m-2 p-5">
        <Menu session={session}/>
        
      </div>
      <div className="w-full m-2 p-20 ">
       {/*<TasksPage session={session}/>*/}
       <TasksPage/> 
      </div>
      
    

    </div>
  );
}

   