import { db } from "@vercel/postgres";
import {Task} from "../../../../lib/type";

   export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    console.log("Début du PATCH");
    const { id } = params;
    const { status } = await req.json();

    if (!id || typeof status !== "boolean") {
        console.log("Erreur : données manquantes ou invalides.");
        return new Response(
            JSON.stringify({ error: "ID ou status invalides" }),
            { status: 400 }
        );
    }

    const client = await db.connect(); // 🔐 Ouvre la connexion 
    try {
        console.log("Connexion réussie");
        const setStatus = await client.sql`
            UPDATE tasks
            SET status = ${status}
            WHERE id = ${id};
            RETURNING *;
        `;

        if (setStatus.rowCount === 0) {
            console.log("Tâche non trouvée avec l'ID:", id);
            return new Response(
                JSON.stringify({ error: "Tâche non trouvée" }),
                { status: 404 }
            );
        }

        console.log("Statut mis à jour avec succès pour la tâche :", id);
        return new Response(
            //JSON.stringify({ success: true, id, status }),
            JSON.stringify({ success: true, task: setStatus.rows[0] }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur dans PATCH /api/tasks/[id]:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }),
            { status: 500 }
        );
    } finally {
        client.release(); // 🔓 Libère la connexion même en cas d’erreur
        console.log("Connexion libérée");
    }
}