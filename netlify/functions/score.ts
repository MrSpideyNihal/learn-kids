import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/mongodb';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing request body' }),
      };
    }

    const { playerId, mode, score, coinsEarned } = JSON.parse(event.body);

    if (!playerId || !mode || typeof score !== 'number' || typeof coinsEarned !== 'number') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required score fields' }),
      };
    }

    const { db } = await connectToDatabase();

    // 1. Fetch player profile to verify existence and retrieve nickname
    const player = await db.collection('players').findOne({ playerId });
    if (!player) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Player profile not found' }),
      };
    }

    // 2. Server-side validation/clamping of coinsEarned to prevent cheating
    let validatedCoins = coinsEarned;
    if (mode === 'guess') {
      // Guess mode base is 10, max with high streak is 20
      validatedCoins = Math.min(20, Math.max(0, coinsEarned));
    } else if (mode === 'match') {
      // Memory match max possible pairs is 8 (Expert) * 5 coins = 40 coins
      validatedCoins = Math.min(40, Math.max(0, coinsEarned));
    } else {
      validatedCoins = 0; // Unknown modes get 0
    }

    // 3. Update player balance
    const updatedPlayer = await db.collection('players').findOneAndUpdate(
      { playerId },
      {
        $inc: { coins: validatedCoins },
        $set: { updatedAt: new Date() }
      },
      { returnDocument: 'after' }
    );

    if (!updatedPlayer) {
      throw new Error('Failed to update player coins.');
    }

    // 4. Save score record under current UTC date string
    const utcDateStr = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    const scoreRecord = {
      playerId,
      nickname: player.nickname,
      mode,
      score,
      coinsEarned: validatedCoins,
      date: utcDateStr,
      createdAt: new Date(),
    };

    await db.collection('scores').insertOne(scoreRecord);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        coinsEarned: validatedCoins,
        newCoinBalance: updatedPlayer.coins,
      }),
    };
  } catch (error: any) {
    console.error('Score submission function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};
export default handler;
