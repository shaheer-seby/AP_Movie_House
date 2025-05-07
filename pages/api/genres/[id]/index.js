import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    const client = await clientPromise;
    const db = client.db();

    const genre = await db
      .collection('genres')
      .findOne({ genreId: id });

    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    res.status(200).json(genre);
  } catch (error) {
    console.error('Error fetching genre:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
