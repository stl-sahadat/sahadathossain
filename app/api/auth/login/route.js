import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getPortfolioData } from '../../../../src/lib/dbService';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const data = await getPortfolioData();
    const authConfig = data?.authConfig || {
      username: 'admin',
      passwordHash: 'sahadat2026',
    };

    const trimmedUser = (username || '').trim();
    const trimmedPass = (password || '').trim();

    if (trimmedUser === authConfig.username && trimmedPass === authConfig.passwordHash) {
      const sessionToken = 'stl_sec_' + crypto.randomBytes(24).toString('hex') + '_' + Date.now();
      return NextResponse.json({
        success: true,
        token: sessionToken,
        user: trimmedUser,
        message: 'Authentication successful. Admin session authorized.',
      });
    }

    return NextResponse.json(
      { error: 'Invalid admin username or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
