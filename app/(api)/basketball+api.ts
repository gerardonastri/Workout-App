import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(
      "postgresql://neondb_owner:wtM9qiWlnEY1@ep-tiny-glade-a5wgmyco.us-east-2.aws.neon.tech/neondb?sslmode=require"
    );

    const response =
      await sql`SELECT * FROM workouts WHERE workout_category = 'basketball'`;

    return Response.json({ data: response });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
