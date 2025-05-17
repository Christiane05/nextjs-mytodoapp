import { db } from "@vercel/postgres";

export async function GET() {
  try {
    const client = await db.connect();
    const done = await client.sql`SELECT COUNT(*) FROM tasks WHERE status = true`;
    const undone = await client.sql`SELECT COUNT(*) FROM tasks WHERE status = false`;

    return Response.json({
      done: Number(done.rows[0].count),
      undone: Number(undone.rows[0].count)
    });
  } catch (error) {
    return Response.json({ error: "Erreur lors du comptage" }, { status: 500 });
  }
}
