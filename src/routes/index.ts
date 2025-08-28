import express from 'express';
import logger from '../middleware/logger';
import images from './api/images';

const routes = express.Router();

routes.use(logger);

routes.get('/', (_req, res) => {
  res.send('API root up');
});

routes.use('/images', images);

export default routes;
