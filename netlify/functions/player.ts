import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/mongodb';

export const handler: Handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { db } = await connectToDatabase();

    // 1. GET Player profile
    if (event.httpMethod === 'GET') {
      const playerId = event.queryStringParameters?.playerId;
      if (!playerId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing playerId parameter' }),
        };
      }

      const player = await db.collection('players').findOne({ playerId });
      if (!player) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Player profile not found' }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, player }),
      };
    }

    // 2. POST Create or Update profile
    if (event.httpMethod === 'POST') {
      if (!event.body) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing request body' }),
        };
      }

      const { playerId, nickname, avatarId, coins, studioUnlocked } = JSON.parse(event.body);

      if (!playerId || !nickname || !avatarId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing playerId, nickname, or avatarId' }),
        };
      }

      // Safeguard values
      const updateDoc: any = {
        nickname,
        avatarId,
        updatedAt: new Date(),
      };

      // Only set initial coin state or update if explicitly provided (e.g. sync/spending)
      if (typeof coins === 'number') {
        updateDoc.coins = Math.max(0, coins);
      }
      if (typeof studioUnlocked === 'boolean') {
        updateDoc.studioUnlocked = studioUnlocked;
      }

      const result = await db.collection('players').findOneAndUpdate(
        { playerId },
        {
          $set: updateDoc,
          $setOnInsert: {
            playerId,
            coins: coins || 0,
            studioUnlocked: studioUnlocked || false,
            createdAt: new Date(),
          },
        },
        { upsert: true, returnDocument: 'after' }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, player: result }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  } catch (error: any) {
    console.error('Player function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};
export default handler;
