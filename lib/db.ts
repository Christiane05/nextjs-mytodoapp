// lib/db.ts
import { createClient } from "@vercel/postgres";

const client = createClient();

export async function connectToDB() {
  await client.connect(); // ← Très important : on connecte le client
  return client;
}
