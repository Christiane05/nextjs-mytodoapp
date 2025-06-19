"use client"

import * as React from "react"
import ClientOnly from "@/components/ui/clientonly"; 
import PieChart from "@/horizon-tailwind-react/src/components/charts/PieChart"; 
import {pieChartData, pieChartOptions} from "@/horizon-tailwind-react/src/variables/charts";

type Stats = {
  done: number
  undone: number
}

type StatsTestProps = React.HTMLAttributes<HTMLDivElement> & {
  refreshTrigger?: number // on va déclencher un refresh en changeant cette valeur
}


const StatsTest = React.forwardRef<HTMLDivElement, StatsTestProps>(
  ({ className, refreshTrigger, ...props }, ref) => {
    const [stats, setStats] = React.useState<Stats | null>(null)

     React.useEffect(() => {
      const fetchStats = async () => {
        try {
          //const res = await fetch("/api/tasks/stats")
          const res = await fetch(`/api/tasks/stats?refresh=${Date.now()}`, {
            cache: "no-store",
          });
          const data = await res.json()
          console.log("📊 Stats reçues:", data)
          setStats(data)
        } catch (error) {
          console.error("❌ Erreur lors du fetch des stats:", error)
        }
      }
      fetchStats()
    }, [refreshTrigger])  // se relance dès que `refreshTrigger` change

    return (
      <div
        ref={ref}
        className={`p-4 rounded  text-sm ${className}`}
        {...props}
      >
        <ClientOnly>
             {!stats ? (
               <p>Chargement du graphique...</p>
               ) : (
               <PieChart
                    series={[stats.done, stats.undone]}
                    options={pieChartOptions}
                />
              )}
          </ClientOnly>
          {stats ? (
            <div>
              <p>Tâches effectuées : {stats.done}</p>
              <p>Tâches non effectuées : {stats.undone}</p>
            </div>
          ) : (
            <p>Chargement des stats...</p>
          )}
      </div>
    )
  }
)

StatsTest.displayName = "StatsTest"

export  { StatsTest }
