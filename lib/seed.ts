import { db } from "@vercel/postgres";
import bcrypt from 'bcrypt';

async function checkIfSeeded() {
  console.log("Debut de la vérification");
  //try{
    const client = await db.connect();
    console.log("Apres connection db vérification")
    const result = await client.sql`SELECT NOW();`;
  
  // Vérifie si des utilisateurs existent déjà
  const userCount = await client.sql`SELECT COUNT(*) FROM users;`;
  return(
    Number(userCount.rows[0].count) > 0, // true si la table users n'est pas vide
    Response.json({ success: true, time: result.rows[0].now })
    )
  //} catch (error: unknown) {
  //  if (error instanceof Error) {
  //    console.error({ success: false, error: error.message }, { status: 500 });
  //  }
  //  console.error({ success: false, error: "An unknown error occurred" }, { status: 500 });
//}

  }
  

async function seedDatabase() {
  console.log("Debut de la création");
 // try {
    console.log("Avant connetion db");
    const client = await db.connect();
    console.log("Dans après DB connection");

  if (await checkIfSeeded()) {
    console.log("✅ La base est déjà remplie, seed ignoré.");
    return;
  }

  console.log("🌱 Seeding de la base...");

  // Création d'un utilisateur avec un mot de passe hashé
  const passwordHash = await bcrypt.hash("password123", 10);
  const user = await client.sql`
    INSERT INTO users (id, name, email, password)
    VALUES ('1', 'John Doe', 'johndoe@example.com', ${passwordHash})
    RETURNING id;
  `;

  const userId = user.rows[0].id;

  // Ajout de quelques tâches pour cet utilisateur
  await client.sql`
    INSERT INTO tasks (id, user_id, description, status, created_at)
    VALUES 
      ('1', ${userId}, 'Acheter du pain', false, NOW()),
      ('2', ${userId}, 'Faire du sport', true, NOW()),
      ('3', ${userId}, 'Apprendre Next.js', false, NOW());
  `;

  console.log("✅ Seed terminé !");
  //}
 // catch (error: unknown) {
 //   if (error instanceof Error) {
 //     console.error({ success: false, error: error.message }, { status: 500 });
 //   }
 //   console.error({ success: false, error: "An unknown error occurred" }, { status: 500 });
//}

console.log("Apres catch");
}

// Exécuter la fonction
seedDatabase().catch((error) => {
  console.error("❌ Erreur lors du seed:", error);
});
