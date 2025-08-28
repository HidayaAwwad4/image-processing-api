import supertest from 'supertest';
import app from '../../index';
import path from 'path';
import { promises as fs } from 'fs';

const request = supertest(app);

describe('API /api/images endpoint', () => {
  const filename = 'fjord';
  const width = 300;
  const height = 200;
  const thumbFile = path.resolve(`assets/thumb/${filename}_${width}x${height}.jpg`);

  beforeAll(async () => {
    try {
      await fs.unlink(thumbFile);
    } catch {}
  });

  it('should return 200 and create a resized image on first call', async () => {
    const res = await request.get(
      `/api/images?filename=${filename}&width=${width}&height=${height}`
    );
    expect(res.status).toBe(200);
    const stat = await fs.stat(thumbFile);
    expect(stat.size).toBeGreaterThan(0);
  });

  it('should serve cached image on subsequent calls (still 200)', async () => {
    const res = await request.get(
      `/api/images?filename=${filename}&width=${width}&height=${height}`
    );
    expect(res.status).toBe(200);
  });

  it('should fail with 400 on missing params', async () => {
    const res = await request.get(`/api/images?filename=${filename}`);
    expect(res.status).toBe(400);
  });

  it('should fail with 400 on invalid width/height', async () => {
    const res = await request.get(`/api/images?filename=${filename}&width=-10&height=abc`);
    expect(res.status).toBe(400);
  });

  it('should fail with 500 on non-existing file', async () => {
    const res = await request.get(`/api/images?filename=notfound&width=200&height=200`);
    expect(res.status).toBe(500);
  });
});
