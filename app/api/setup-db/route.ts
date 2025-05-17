import {db} from '@vercel/postgres'

export async function GET() {

    try {
        const client = await db.connect();
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; // Création de l'extension uuid_generate_v4()

        //Création table Users
        await client.sql `
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255),
                email TEXT NOT NULL,
                password TEXT NOT NULL
            );
        `;

        //Création table Tasks
        await client.sql`
            CREATE TABLE IF NOT EXISTS tasks (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
                user_id UUID NOT NULL,
                description TEXT NOT NULL,
                status BOOLEAN DEFAULT false, 
                created_at TIMESTAMP DEFAULT NOW(),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
            );
        `;
    
        return Response.json({message: 'Table créées avec succes !'});
    }
    catch (error: unknown) {
        if (error instanceof Error) {
          return Response.json({ success: false, error: error.message }, { status: 500 });
        }
        return Response.json({ success: false, error: "An unknown error occurred" }, { status: 500 });
    }
    

}