import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './models/usermodel.js';
import { connectDb } from './config/database.js';
import routesLoader from './routes/loader.js';
import createAdmin from './config/createAdmin.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDb().then(() => {
  createAdmin();
  routesLoader(app);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
