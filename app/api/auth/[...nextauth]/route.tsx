import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from '@vercel/postgres';
import type { User } from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signIn(context: { user: User }) {
      const { user } = context;

      try {
        const client = await db.connect();
        const result = await client.sql`SELECT * FROM users WHERE email = ${user.email}`;

        if (result.rowCount === 0) {
          await client.sql`
            INSERT INTO users (email, name)
            VALUES (${user.email}, ${user.name})
          `;
          console.log("✅ Nouvel utilisateur ajouté :", user.email);
        }
      } catch (err) {
        console.error("❌ Erreur lors de l'enregistrement de l'utilisateur :", err);
      }
    }
  }
};

const handler = NextAuth(authOptions);

// **Ne pas exporter authOptions**
// Juste les handlers HTTP

export { handler as GET, handler as POST };
