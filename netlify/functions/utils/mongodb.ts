import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside your Netlify settings.');
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(); // connects to default DB specified in MONGODB_URI

  // Idempotently create indexes to optimize lookups and sorting
  try {
    await db.collection('players').createIndex({ playerId: 1 }, { unique: true });
    await db.collection('scores').createIndex({ date: 1, score: -1 });
    await db.collection('scores').createIndex({ playerId: 1, date: 1 });
    await db.collection('posters').createIndex({ playerId: 1 });
  } catch (e) {
    console.warn("Index creation warning:", e);
  }

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
export default connectToDatabase;
