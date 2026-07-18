import { handler } from './player';
import { connectToDatabase } from './utils/mongodb';
import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('./utils/mongodb', () => {
  const mockDb = {
    collection: vi.fn().mockReturnValue({
      findOne: vi.fn(),
      findOneAndUpdate: vi.fn(),
    }),
  };
  return {
    connectToDatabase: vi.fn().mockResolvedValue({ db: mockDb }),
    default: vi.fn().mockResolvedValue({ db: mockDb }),
  };
});

describe('Player Serverless API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when missing playerId in GET requests', async () => {
    const mockEvent: any = {
      httpMethod: 'GET',
      queryStringParameters: {},
    };

    const response = await handler(mockEvent, {} as any);
    expect(response?.statusCode).toBe(400);
    expect(JSON.parse(response?.body || '{}').error).toContain('Missing playerId');
  });

  it('returns 404 when player is not found', async () => {
    const mockEvent: any = {
      httpMethod: 'GET',
      queryStringParameters: { playerId: 'missing-id' },
    };

    const { db } = await connectToDatabase();
    (db.collection as any)().findOne.mockResolvedValueOnce(null);

    const response = await handler(mockEvent, {} as any);
    expect(response?.statusCode).toBe(404);
    expect(JSON.parse(response?.body || '{}').error).toContain('not found');
  });

  it('returns player profile on successful GET requests', async () => {
    const mockEvent: any = {
      httpMethod: 'GET',
      queryStringParameters: { playerId: 'valid-id' },
    };

    const mockProfile = { playerId: 'valid-id', nickname: 'TestKid', coins: 10 };
    const { db } = await connectToDatabase();
    (db.collection as any)().findOne.mockResolvedValueOnce(mockProfile);

    const response = await handler(mockEvent, {} as any);
    expect(response?.statusCode).toBe(200);
    expect(JSON.parse(response?.body || '{}').player).toEqual(mockProfile);
  });
});
