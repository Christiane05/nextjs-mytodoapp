import { db } from "@vercel/postgres";

export async function GET() {
    try {
        // Se connecter à la base de données
        const client = await db.connect();
        
        // Exécuter la requête SQL pour récupérer toutes les tâches
        const result = await client.sql`SELECT * FROM tasks;`;

        // Vérifie si des résultats ont été renvoyés par la base de données
        if (result.rows.length === 0) {
            return Response.json({ success: true, message: "Aucune tâche trouvée." });
        }

        // Si des résultats sont trouvés, renvoie-les dans la réponse
        return Response.json({ success: true, data: result.rows });

    } catch (error) {
        // En cas d'erreur, renvoie un message d'erreur
        return Response.json({ success: false, error}, { status: 500 });
    }
}
