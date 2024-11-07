import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(
      "postgresql://neondb_owner:wtM9qiWlnEY1@ep-tiny-glade-a5wgmyco.us-east-2.aws.neon.tech/neondb?sslmode=require"
    );
    const { name, email, password } = await request.json();

    if (!name || !email) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      INSERT INTO users (
        name, 
        email,
        password 
      ) 
      VALUES (
        ${name}, 
        ${email},
        ${password || ""}
     );`;

    return new Response(JSON.stringify({ data: response }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
