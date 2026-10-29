import fs from 'fs';
import path from 'path';
import { prisma } from './prisma';

const JSON_STORE_PATH = path.resolve(process.cwd(), 'src/data/portfolio-store.json');

/**
 * Reads portfolio data from MySQL via Prisma ORM.
 * Automatically falls back to disk JSON store if MySQL is not available.
 */
export async function getPortfolioData() {
  // 1. Attempt MySQL via Prisma
  try {
    const record = await prisma.portfolioStore.findUnique({
      where: { key: 'master_portfolio_v3' },
    });
    if (record && record.data) {
      return JSON.parse(record.data);
    }
  } catch (err) {
    // MySQL not running or not configured, gracefully continue to disk store
  }

  // 2. Fallback to Disk JSON
  try {
    if (fs.existsSync(JSON_STORE_PATH)) {
      const raw = fs.readFileSync(JSON_STORE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed reading fallback JSON store:', e);
  }

  return null;
}

/**
 * Saves portfolio data to MySQL via Prisma ORM and persists to disk.
 */
export async function savePortfolioData(data) {
  const jsonString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  let savedToPrisma = false;

  // 1. Save to MySQL via Prisma
  try {
    await prisma.portfolioStore.upsert({
      where: { key: 'master_portfolio_v3' },
      update: { data: jsonString },
      create: {
        key: 'master_portfolio_v3',
        data: jsonString,
      },
    });
    savedToPrisma = true;
  } catch (err) {
    // MySQL not reachable, continuing to disk store
  }

  // 2. Always persist to disk JSON store as reliable backup
  try {
    const dir = path.dirname(JSON_STORE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(JSON_STORE_PATH, jsonString, 'utf-8');
  } catch (e) {
    console.error('Failed writing to local JSON store:', e);
  }

  return { success: true, savedToPrisma };
}
