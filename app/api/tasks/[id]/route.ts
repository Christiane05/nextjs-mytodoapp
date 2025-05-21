import { db } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest, context: any) {
  try {
    // Essaie de récupérer l'id dans params, sinon via nextUrl
    let id = context?.params?.id;

    if (!id) {
      // fallback : récupérer depuis l'URL
      const url = new URL(req.url);
      id = url.pathname.split("/").pop();
      console.log("Fallback ID extrait depuis l'URL :", id);
    }

    if (!id) {
      console.error("❌ ID introuvable dans la requête");
      return new Response(JSON.stringify({ error: "ID non fourni" }), { status: 400 });
    }

    const { status } = await req.json();
    if (typeof status !== "boolean") {
      return new Response(JSON.stringify({ error: "Status invalide" }), { status: 400 });
    }

    const client = await db.connect();
    try {
      const result = await client.sql`
        UPDATE tasks SET status = ${status} WHERE id = ${id} RETURNING *;
      `;
      if (result.rowCount === 0) {
        return new Response(JSON.stringify({ error: "Tâche non trouvée" }), { status: 404 });
      }
      return new Response(JSON.stringify({ success: true, task: result.rows[0] }), { status: 200 });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Erreur dans PATCH:", err);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}
