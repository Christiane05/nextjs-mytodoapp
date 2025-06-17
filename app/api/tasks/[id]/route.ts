import { db } from "@vercel/postgres";
//import { connectToDB } from "@/lib/db";
import { NextRequest } from "next/server";

// PATCH /api/tasks/:id → mise à jour du statut d'une tâche
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // ✅ Works in Next.js 15
    console.log("🔧 PATCH reçu. ID =", id);

    const { status } = await req.json();
    console.log("✅ Status reçu :", status);

    // Connexion manuelle à la base
    const client = await db.connect();

    try {
      console.log("AVANT connexion db PATCH");
      const result = await client.sql `
      UPDATE tasks
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *;
    `;
     
     console.log("APRES connexion db PATCH");
      if (result.rows.length === 0) {
        return new Response("Tâche non trouvée", { status: 404 });
      }

      console.log("✅ Statut mis à jour :", result.rows[0]);
      return new Response(JSON.stringify(result.rows[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      return Response.json({ success: true });
    }
     catch(error) {
      console.error("Connexion db de PATCH a ECHOUE");
      return new Response("Erreur serveur", { status: 500 });
    }
    finally {
    client.release();
    console.log("Connexion PATCH libérée");
  }
    
  } catch (error) {
    console.error("❌ Erreur dans PATCH /api/tasks/[id]:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
}
