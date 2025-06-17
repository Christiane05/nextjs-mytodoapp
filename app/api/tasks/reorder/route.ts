import { db } from "@vercel/postgres";
import { Task } from "@/lib/type";

export async function POST(req: Request) {
  const client = await db.connect();

  try {
    const { tasks }: { tasks: Task[] } = await req.json();

    for (let i = 0; i < tasks.length; i++) {
      await client.sql`
        UPDATE tasks SET position = ${i} WHERE id = ${tasks[i].id}
      `;
    }

    return new Response(JSON.stringify({ message: "Positions mises à jour" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur serveur", details: error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    client.release();
  }
}
