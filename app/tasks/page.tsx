"use client";
import { useEffect, useState } from "react";
import { useTasks } from "@/lib/hook/useTasks";
import { addTask, deleteTask, getTasks, updateStatus } from "@/lib/queries";
import { Task } from "@/lib/type";
import Toggle from "@/components/ui/Toggle";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Listcheckbox } from "@/components/ui/listcheckbox";
import { Checkbox } from "@/components/ui/checkbox";
import {StatsTest} from "@/components/ui/stats";
//import Toggle from "@/components/ui/Toggle";
import '../globals.css';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]); // Liste des tâches
  const [description, setDescription] = useState("");
  //const tasks: Task[] = useTasks();

  const [refreshStats, setRefreshStats] = useState(0);
  //const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleStatusChange = async (id: string, newStatus: boolean) => {
  try {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks); // MAJ visuelle
    console.log("🔁 Mise à jour AVANT UPDATESTATUS de la BDD pour la tâche", id, "avec status", newStatus);
    try {
        await updateStatus(id, newStatus); // MAJ BDD
    } catch (err) {
        console.error("🔥 ERREUR DANS updateStatus:", err);
    }
    console.log("🔁 Mise à jour APRES UPDATESTATUS de la BDD pour la tâche", id, "avec status", newStatus);
    setRefreshStats(prev => prev + 1); // MAJ des stats
  } catch (e) {
    console.error("Erreur update status", e)
  }
};

  // Charger les tâches au démarrage de la page
  useEffect(() => {
    getTasks().then(setTasks);
    console.log("Ceci est tasks dans useEffect: "+tasks);
  }, []);

  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const newTask : Task = await addTask( "3fadb5e6-414b-4d08-9df0-09d45cc9c829", description) ; // Remplace "1" par un vrai user_id plus tard
      console.log("Ceci est newTask après addTask : "+newTask+ "ceci est la description : "+description); //undefined
      setDescription(""); // Réinitialise le champ après ajout
      // Mettre à jour la liste des tâches immédiatement
      setTasks((prevTasks) => [...prevTasks, newTask]);
      console.log("Ceci est newTask après permutation : "+newTask+ "ceci est la description : "+description); //undefined
      console.log("Ceci est tasks: "+tasks+ "ceci est la description : "+description); //Object Object
      console.log("Ceci est la description de nouvelle task: "+newTask.description);
      console.log("Ceci est le status de nouvelle task: "+newTask.status);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  }

  async function handleDelete (id : string) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error){
      console.error("Erreur lors de la suppression : ",error);
    }
  }

  // Fonction pour mettre à jour le statut d'une tâche
   const handleToggleChange = (id : string, newStatus : boolean) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks); // MAJ visuelle
    try {
      updateStatus(id, newStatus); // MAJ BDD
      //setRefreshStats(prev => prev + 1); // 🔁 MAJ des stats
      setRefreshStats(prev => {
        console.log("🌀 Refresh trigger before update:", prev);
        return prev + 1;
      });
      //console.log("📌 refreshTrigger :", refreshTrigger )
      console.log("📌 refreshTrigger :", refreshStats )
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  return (
    <div>
      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nouvelle tâche..."
          required
        />
        {/*<button type="submit">➕ Ajouter</button>*/}
        <Button variant="outline">➕</Button>

        
      </form>
      

      {/* Affichage des tâches */}
      <Card className="w-96">
          <CardHeader>
            <CardTitle>Liste des tâches</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="grid gap-1.5 leading-none">
                <table className="table-auto border border-gray-400 font leading-none tracking-tight">
                      <tbody>
                            {tasks.map((task) => (
                            
                            <tr key={task.id}>
                            <td className="table-auto border border-gray-400 w-2/4 p-2"> 
                              {task.description} - {task.status ? "✅" : "❌"} 
                            </td>
                            <td className="table-auto border border-gray-400 w-1/4 p-2">  
                              <Toggle
                                status={task.status}
                                onToggleChange={(newStatus: boolean) => {
                                 // handleToggleChange(task.id, newStatus);
                                  handleStatusChange(task.id, newStatus);
                                 //  (task.id, newStatus);
                                }}
                              />
                            </td>
                            <td className="table-auto border border-gray-400 w-1/4 p-2">
                              <button onClick={() => handleDelete(task.id)} style={{ marginLeft: "10px" }}>
                                  🗑️   
                              </button>
                            </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
              </div>
          </CardContent>
      </Card>
      {/*<StatsTest key={refreshStats} refreshTrigger={refreshStats}/>*/}
      <StatsTest key={refreshStats} refreshTrigger={refreshStats} />
    </div>
    
  );
}
