import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const client = await clientPromise;
    const db = client.db();
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
