import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const directors = await db.collection('directors').find().toArray();

    res.status(200).json(directors);
  } catch (error) {
    console.error('Failed to fetch directors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
