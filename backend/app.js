import express from 'express';
import authRoutes from './routes/authRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', authRoutes);
app.use('/', imageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server run on: ${port}`);
});
