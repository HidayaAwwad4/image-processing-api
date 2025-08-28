import express from 'express';
import routes from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', routes);

app.get('/', (_req, res) => {
  res.status(200).send('Image Processing API');
});

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});

export default app;
