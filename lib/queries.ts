
import { Task } from "./type";

export async function getTasks() {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    return data.tasks;
  }

  export async function addTask(description : string) : Promise<Task> {
    const  res = await fetch("/api/tasks" , {// ici est le lien avec la logique de la requete
        method : "POST" , //requette http qui va envoyer les infos dans serveur
        headers : { "Content-Type" : "application/json" } , //convertis les données à envoiyer en json 
        body : JSON.stringify({description}) //transforme l'objet en chaîne JSON car fetch n'envoie que du texte
      } 
    );
    if (!res.ok) throw new Error("Erreur d'ajout de tâche")
    // Récupère les données retournées par l'API (c'est la tâche ajoutée)
    const data = await res.json();
    // La tâche ajoutée se trouve dans data.task
    return data.newTask;
  }


  export async function deleteTask (id : string) {
    const res = await fetch ("/api/tasks" , {
      method : "DELETE" ,
      headers : { "Content-Type" : "application/json" } , 
      body : JSON.stringify({id})
    });
    if (!res.ok) throw new Error("Erreur lors de la suppression");
    return res.json();
  }

  export async function updateStatus (id : string , newStatus : boolean){
    const res = await fetch (`/api/tasks/${id}` , {
    //const res = await fetch (`/api/tasks/1234` , {
      method : "PATCH" ,
      headers : { "Content-Type" : "application/json" } , 
      body : JSON.stringify({status: newStatus})
    });
   
    if (!res.ok) throw new Error("Erreur lors du changement de status"); //ET ça va ici, donc rien n'a été affecté au res
    return (
      res.json())
  }
  
// 2. Appel statistiques : compter tâches faites / non faites
export async function getTaskStats() {
  const res = await fetch("/api/tasks/stats");
  if (!res.ok) throw new Error("Erreur lors de la récupération des stats");
  const data = await res.json();
  return data; // { done: number, undone: number }
}

export async function updateTaskPositions(tasks: Task[]) {
  const res = await fetch("/api/tasks/reorder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tasks }),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la mise à jour des positions");
  }

  return res.json();
}

//Modifier une tache 
export async function editTask (id : string , description : string): Promise<Task> {
    console.log("📡 editTask appelée avec", id, description); // Ajoute ceci
    const res = await fetch (`/api/tasks/edit/${id}` , {
      method : "PATCH" ,
      headers : { "Content-Type" : "application/json" } , 
      body : JSON.stringify({description: description})
    });
   
    if (!res.ok) throw new Error("Erreur lors de modification de la tâche"); //ET ça va ici, donc rien n'a été affecté au res
    return (
      res.json())
  }