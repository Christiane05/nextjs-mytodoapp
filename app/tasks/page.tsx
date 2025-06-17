"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useTasks } from "@/lib/hook/useTasks";
import { addTask, deleteTask, getTasks, updateStatus, editTask } from "@/lib/queries";
import { Task } from "@/lib/type";
import Toggle from "@/components/ui/Toggle";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {StatsTest} from "@/components/ui/stats";
//import Toggle from "@/components/ui/Toggle";
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
    console.log("🔁 Mise à jour AVANT UPDATESTATUS de la BDD pour la tâche", id, "avec status", newStatus);
    try {
        console.log ("DANS TRY updateStatus");
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

//Modification des tâches 
 const handleEditTask = async (id: string, newDescription: string) => {
  try {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks); // MAJ visuelle dans la liste
    console.log("🔁 Mise à jour AVANT BDD", id, newDescription);
    try {
        console.log ("DANS TRY UPDATEEDITTASK");
        await editTask(id, newDescription); // MAJ BDD
    } catch (err) {
        console.error("🔥 ERREUR DANS updateStatus:", err);
    }
    console.log("🔁 Mise à jour APRES UPDATEEDITTASK de la BDD pour la tâche", id, "avec status", newDescription);
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
      const newTask : Task = await addTask( "3fadb5e6-414b-4d08-9df0-09d45cc9c829", description) ; // Remplace "1" par un vrai user_id plus tard
      console.log("Ceci est newTask après addTask : "+newTask+ "ceci est la description : "+description); //undefined
      setDescription(""); // Réinitialise le champ après ajout
      // Mettre à jour la liste des tâches immédiatement
      setTasks((prevTasks) => [...prevTasks, newTask]);
      console.log("Ceci est newTask après permutation : "+newTask+ "ceci est la description : "+description); //undefined
      console.log("Ceci est tasks: "+tasks+ "ceci est la description : "+description); //Object Object
      console.log("Ceci est la description de nouvelle task: "+newTask.description);
      console.log("Ceci est le status de nouvelle task: "+newTask.status);
     
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
        <div className="flex">
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
              {/*<button type="submit">➕ Ajouter</button>*/}
            </form>
            <button onClick={() => {handleSubmit}}>
                  <Plus className="w-6 h-6 text-blue-500" />
            </button>
          </div>
         
          
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
