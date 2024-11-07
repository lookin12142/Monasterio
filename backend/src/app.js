import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/database.js';
import routesLoader from './routes/loader.js';
import createAdmin from './config/createAdmin.js';
import errorHandler from './middleware/errorMiddleware.js';
import './models/usermodel.js';
import './models/productmodel.js';
import './models/incomemodel.js';
import './models/egressmodel.js';

dotenv.config();

const app = express();
app.use(errorHandler);
app.use(cors());
app.use(express.json());

const PORT = process.env.NEXT_PUBLIC_API_PORT || 3005;

connectDb().then(() => {
  createAdmin();
  routesLoader(app);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});