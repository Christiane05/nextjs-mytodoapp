import { db } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  
  const client = await db.connect();  
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return Response.json({ error: "Utilisateur non connecté" }, { status: 401 });
  }

  try {

    const done = await client.sql`SELECT COUNT(*) FROM tasks WHERE user_email = ${userEmail} AND status = true;`;
    const undone = await client.sql`SELECT COUNT(*) FROM tasks WHERE user_email = ${userEmail} AND status = false`;

    return Response.json({
      done: Number(done.rows[0].count),
      undone: Number(undone.rows[0].count)
    });
  } catch (error) {
    return Response.json({ error: "Erreur lors du comptage" }, { status: 500 });
  }
}
