import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/mongodb';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const playerId = event.queryStringParameters?.playerId;
    const { db } = await connectToDatabase();

    const utcDateStr = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    // Group and sum daily scores per player
    const dailyScores = await db.collection('scores').aggregate([
      { $match: { date: utcDateStr } },
      {
        $group: {
          _id: '$playerId',
          nickname: { $first: '$nickname' },
          score: { $sum: '$score' },
          coinsEarned: { $sum: '$coinsEarned' },
        }
      },
      { $sort: { score: -1 } }
    ]).toArray();

    // Map ranks (1-indexed)
    const rankedList = dailyScores.map((item, index) => ({
      playerId: item._id,
      nickname: item.nickname,
      score: item.score,
      coinsEarned: item.coinsEarned,
      rank: index + 1,
    }));

    const top10 = rankedList.slice(0, 10);
    
    let activePlayerRank: any = null;
    if (playerId) {
      activePlayerRank = rankedList.find((r) => r.playerId === playerId) || null;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        date: utcDateStr,
        leaderboard: top10,
        playerRank: activePlayerRank,
      }),
    };
  } catch (error: any) {
    console.error('Leaderboard calculation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};
export default handler;
