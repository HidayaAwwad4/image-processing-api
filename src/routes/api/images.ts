import express from 'express';
import path from 'path';
import { ensureThumbReady } from '../../utilities/imageProcessing';

const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { filename, width, height } = req.query;

    if (!filename || !width || !height) {
      res.status(400).send('Missing query params: filename, width, height are required.');
      return;
    }

    const w = parseInt(width as string, 10);
    const h = parseInt(height as string, 10);

    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
      res.status(400).send('width/height must be positive integers.');
      return;
    }

    const resultPath = await ensureThumbReady(filename as string, w, h);

    res.status(200).sendFile(path.resolve(resultPath));
  } catch (err: unknown) {
    res.status(500).send(`Processing failed: ${(err as Error).message}`);
  }
});

export default images;
