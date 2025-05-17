import { Task } from "@/lib/type";
import { db } from "@vercel/postgres";

// ✅ Lire toutes les tâches
export async function GET() {
  const client = await db.connect();
  try {
    const tasks = await client.sql`SELECT * FROM tasks;`;
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
  const client = await db.connect();
  try {
    const requete: Task = await req.json();
    const { user_id, description } = requete;
    const newTask = await client.sql`
      INSERT INTO tasks (user_id, description, status, created_at)
      VALUES (${user_id}, ${description}, false, NOW())
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
