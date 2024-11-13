import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
  try {
    const sql = neon(
      "postgresql://neondb_owner:wtM9qiWlnEY1@ep-tiny-glade-a5wgmyco.us-east-2.aws.neon.tech/neondb?sslmode=require"
    );

    const response = await sql`
        SELECT * 
        FROM Exercises
        WHERE workout_id = ${id};
      `;

    return Response.json({ data: response });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
