import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    const client = await clientPromise;
    const db = client.db();


    const director = await db.collection('directors').findOne({ dId: id });
    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }

    const movies = await db.collection('movies').find({ directorId: id }).toArray();

    res.status(200).json({
      ...director,
      moviesDirected: movies,
    });
  } catch (error) {
    console.error('Error fetching director details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
