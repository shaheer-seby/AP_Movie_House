import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query; // genre ID

    const client = await clientPromise;
    const db = client.db();

    const movies = await db
      .collection('movies')
      .find({ genreId: id })  // match movies by genreId
      .toArray();

    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
