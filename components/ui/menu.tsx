"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutButton from "@/components/ui/logoutbutton";
import { Moon , LogOutIcon} from 'lucide-react';
import ThemeToggle from "./themetoggle";


export function Menu ({ session }: { session: any }) {
    return (
        <div className="grid grid-flow-col ">

            <div className=" flex-1 ">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="p-4 ml-20 border border-border rounded-xl bg-card text-card-foreground shadow hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent">Mon compte</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>  <Moon/> Thème <ThemeToggle/></DropdownMenuItem>
                            <DropdownMenuItem><LogOutIcon/><LogoutButton/> </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>        
                </div>
            
                <div className=" flex-1 ">
                    <DropdownMenu>
                        <DropdownMenuTrigger></DropdownMenuTrigger>        
                    </DropdownMenu>
                </div>
                
                <div className=" flex-1 ">
                    <DropdownMenu>
                    </DropdownMenu>
                </div>
                
                
        </div>
    )
}