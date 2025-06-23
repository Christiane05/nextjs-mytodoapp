import GoogleProvider from "next-auth/providers/google";
import { db } from "@vercel/postgres";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signIn({ user }) {
      try {
        const client = await db.connect();
        const result = await client.sql`SELECT * FROM users WHERE email = ${user.email}`;
        if (result.rowCount === 0) {
          await client.sql`
            INSERT INTO users (email, name)
            VALUES (${user.email}, ${user.name})
          `;
        }
      } catch (err) {
        console.error("❌ Erreur DB signIn:", err);
      }
    },
  },
};
