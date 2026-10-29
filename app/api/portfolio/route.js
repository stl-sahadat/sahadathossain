import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '../../../src/lib/dbService';

export async function GET() {
  try {
    const data = await getPortfolioData();
    if (data) {
      const sanitized = { ...data };
      if (sanitized.authConfig) {
        sanitized.authConfig = {
          username: sanitized.authConfig.username || 'admin',
          maxAttempts: sanitized.authConfig.maxAttempts || 3,
          lockoutSeconds: sanitized.authConfig.lockoutSeconds || 15,
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
    const body = await request.json();
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
