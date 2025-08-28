import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';

const ASSETS_DIR = path.resolve('assets');
const FULL_DIR = path.join(ASSETS_DIR, 'full');
const THUMB_DIR = path.join(ASSETS_DIR, 'thumb');

const JPG_EXT = '.jpg';

const fullPath = (filename: string): string => {
  const base = filename.toLowerCase().endsWith(JPG_EXT) ? filename : `${filename}${JPG_EXT}`;
  return path.join(FULL_DIR, base);
};

const thumbPath = (filename: string, width: number, height: number): string => {
  const base = filename.toLowerCase().endsWith(JPG_EXT) ? filename.slice(0, -4) : filename;
  return path.join(THUMB_DIR, `${base}_${width}x${height}${JPG_EXT}`);
};

async function ensureDir(dir: string): Promise<void> {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

export async function ensureThumbReady(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  const source = fullPath(filename);
  try {
    await fs.access(source);
  } catch {
    throw new Error(`Source image not found: ${source}`);
  }

  await ensureDir(THUMB_DIR);
  const target = thumbPath(filename, width, height);
  try {
    await fs.access(target);
    return target;
  } catch {}

  await sharp(source).resize(width, height).jpeg({ quality: 80 }).toFile(target);

  return target;
}
