"use client";
import { SetStateAction, useEffect, useState } from "react";
import { addTask, deleteTask, getTasks, updateStatus, editTask } from "@/lib/queries";
import { Task } from "@/lib/type";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {StatsTest} from "@/components/ui/stats";
import '../globals.css';
import TestDragAndDrop from "@/components/ui/testdraganddrop";
import { Plus } from "lucide-react";

export default function TasksPage({ session }: { session: any }) {
  const [tasks, setTasks] = useState<Task[]>([]); // Liste des tâches

  //Voici un état local pour la tache en cours de modification 
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [description, setDescription] = useState<string>(""); 
  const [newDescription, setNewDescription] = useState<string>("");  // Add this state for editing tasks

  const [refreshStats, setRefreshStats] = useState(0);
  const [refreshPosition, setRefreshPosition] = useState(0);
  const [refreshDescription, setRefreshDescription] = useState(0);



  const handleStatusChange = async (id: string, newStatus: boolean) => {
  try {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks); // MAJ visuelle
    try {
        await updateStatus(id, newStatus); // MAJ BDD
    } catch (err) {
        console.error("🔥 ERREUR DANS updateStatus:", err);
    }
    setRefreshStats(prev => prev + 1); // MAJ des stats
  } catch (e) {
    console.error("Erreur update status", e)
  }
};

//Modification des tâches 
 const handleEditTask = async (id: string, newDescription: string) => {
  try {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks); // MAJ visuelle dans la liste
    try {
        await editTask(id, newDescription); // MAJ BDD
    } catch (err) {
        console.error("🔥 ERREUR DANS updateStatus:", err);
    }
     setRefreshDescription(prev => prev + 1); // MAJ des stats
  } catch (e) {
    console.error("Erreur update status", e)
  }
};

   // Charger les tâches au démarrage de la page
  useEffect(() => {
    getTasks().then(setTasks);
    console.log("Ceci est tasks dans useEffect: "+tasks);
  }, [refreshPosition]);
  
 
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const newTask : Task = await addTask( description) ; // Remplace "1" par un vrai user_id plus tard
      setDescription(""); // Réinitialise le champ après ajout
      // Mettre à jour la liste des tâches immédiatement
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setRefreshPosition(prev => prev + 1);  // Forcer le reload de position des taches
      setRefreshStats((prev) => prev + 1); // ✅ actualise les stats

    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  }
  async function handleDelete (id : string) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setRefreshPosition(prev => prev + 1);  // Forcer le reload de position des taches
      setRefreshStats((prev) => prev + 1); // ✅ actualise les stats

    } catch (error){
      console.error("Erreur lors de la suppression : ",error);
    }
  }

  return (
    <div className=" flex flex-col md:flex-row">
      <div className="flex-1 border-b-2">
          <div className="flex items-center gap-2 m-4 " >
            {/* Formulaire d'ajout */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-grow max-w-[70%]">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nouvelle tâche"
                required
                className = "flex-grow p-2 border border-border rounded-xl bg-card text-card-foreground shadow w-80"
              />
              <button type="submit"> <Plus className="w-6 h-6 text-blue-500" /></button>
            </form>
          </div>
         
          
        <div className="flex">
          <div className="flex-1 m-4">
                <Card className="border border-border rounded-xl bg-card text-card-foreground shadow ">
                  <CardHeader>
                    <CardTitle>Bon, au boulot ! </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TestDragAndDrop
                      tasks={tasks}
                      setTasks={setTasks}
                      handleStatusChange={handleStatusChange}
                      handleDelete={handleDelete}
                      setRefreshPosition={setRefreshPosition}
                      handleEditTask={handleEditTask}
                      editingTaskId={editingTaskId}
                      setEditingTaskId={setEditingTaskId}
                      newDescription={newDescription}
                      setNewDescription={setNewDescription}
                    />
                  </CardContent>
                </Card>
          </div>
            <div className ="flex-1 m-4 border border-border rounded-xl bg-card text-card-foreground shadow">
              <StatsTest key={refreshStats} refreshTrigger={refreshStats}/>
            </div>
        </div>
       
      </div>
      
    </div>
    
  );
}