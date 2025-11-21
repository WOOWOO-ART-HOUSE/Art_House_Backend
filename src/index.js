import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connectDb.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());

app.use('/arthouse/api/v1/auth', authRouter);

try {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}/`);
  });
} catch (error) {
  console.error('❌ Failed to connect to the database:', err.message);
  process.exit(1);
}
