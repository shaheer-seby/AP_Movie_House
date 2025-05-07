import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;  // Ensure the MongoDB client is connected
  const db = client.db();  // Use the MongoDB database

  if (req.method === 'GET') {
    try {
      const movies = await db.collection('movies').find().toArray();  // Fetch all movies from the "movies" collection
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching movies' });
    }
  }
  else {
    res.status(405).end();  // Method Not Allowed
  }
}
