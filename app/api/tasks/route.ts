import { Task } from "@/lib/type";
import { db } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";




// ✅ Lire toutes les tâches
export async function GET() {
  const client = await db.connect();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  try {
    const tasks = await client.sql`SELECT * FROM tasks
    WHERE user_email = ${userEmail}
    ORDER BY position DESC;`; 
    return Response.json({ tasks: tasks.rows });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Erreur inconnue" }, { status: 500 });
  } finally {
    client.release();
    console.log("Connexion GET libérée");
  }
}


// Modifier les tâches
export async function POST(req: Request) {
  console.log("Debut de POST integrer tache");
  const client = await db.connect();

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const { description } = await req.json();
   if (!userEmail) {
      return Response.json({ error: "Utilisateur non connecté" }, { status: 401 });
    }
  if (!description) {
      return Response.json({ error: "Description requise" }, { status: 400 });
    }

  try {
    //const requete: Task = await req.json();
    const { rows } = await client.sql`SELECT MAX(position) as max FROM tasks`; //Ordonne la position de la tâche sur la colonne position
    const lastPosition = rows[0].max ?? 0; // row.max = valeur max et si valeur est nulle donc on met 0 
    console.log("Dans POST avant requete SQL");
    const newTask = await client.sql`
      INSERT INTO tasks (user_email, description, status, created_at, position)
      VALUES (${userEmail}, ${description}, false, NOW(), ${lastPosition + 1})
      RETURNING *
    `;
    return Response.json({ newTask: newTask.rows[0] });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Erreur inconnue" }, { status: 500 });
  } finally {
    client.release();
    console.log("Connexion POST libérée");
  }
}


//Supprimer les tâches = Puis queries = puis page.tsx de app/tasks
export async function DELETE(req: Request) {
  const client = await db.connect();
  try {
    const requete: Task = await req.json();
    const id = requete.id;
    const delTask = await client.sql`
      DELETE FROM tasks WHERE id = ${id}
    `;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Erreur inconnue" }, { status: 500 });
  } finally {
    client.release();
    console.log("Connexion DELETE libérée");
  }
}

