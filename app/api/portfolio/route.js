import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '../../../src/lib/dbService';
import { verifySessionToken } from '../../../src/lib/sessionService';
import { DEFAULT_ADMIN_USER, SECURITY_SALT } from '../../../src/lib/security';

export async function GET() {
  try {
    const data = await getPortfolioData();
    if (data) {
      const sanitized = { ...data };
      if (sanitized.authConfig) {
        sanitized.authConfig = {
          username: sanitized.authConfig.username || DEFAULT_ADMIN_USER,
          maxAttempts: sanitized.authConfig.maxAttempts || 3,
          lockoutSeconds: sanitized.authConfig.lockoutSeconds || 15,
          salt: sanitized.authConfig.salt || SECURITY_SALT,
        };
      }
      return NextResponse.json(sanitized);
    }
    return NextResponse.json({ empty: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : null;

    if (!verifySessionToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized: Valid administrative session token required to modify portfolio data.' },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body || typeof body !== 'object' || (!body.personalInfo && !body.projects)) {
      return NextResponse.json(
        { error: 'Invalid payload: Missing core portfolio structures.' },
        { status: 400 }
      );
    }

    const result = await savePortfolioData(body);
    return NextResponse.json({
      success: true,
      savedToPrisma: result.savedToPrisma,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
