import path from 'path';
import { promises as fs } from 'fs';
import { ensureThumbReady } from '../../utilities/imageProcessing';

describe('imageProcessing.ensureThumbReady', () => {
  const filename = 'fjord';
  const width = 120;
  const height = 120;
  const out = path.resolve(`assets/thumb/${filename}_${width}x${height}.jpg`);

  beforeAll(async () => {
    try {
      await fs.unlink(out);
    } catch {}
  });

  it('creates a thumbnail and returns its path', async () => {
    const p = await ensureThumbReady(filename, width, height);
    expect(p.endsWith(`${filename}_${width}x${height}.jpg`)).toBeTrue();
    const stat = await fs.stat(out);
    expect(stat.size).toBeGreaterThan(0);
  });

  it('returns cached path without reprocessing if file exists', async () => {
    const p2 = await ensureThumbReady(filename, width, height);
    expect(p2).toBe(out);
  });
});
