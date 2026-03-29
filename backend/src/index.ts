import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from "./config/db";
import webhookRoutes from "./routes/webhook";

const app = express();
const PORT: number = 3000;

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'svix-id', 'svix-signature', 'svix-timestamp']
}));

/** * IMPORTANT: The Webhook route must come BEFORE express.json()
 * We handle the body parsing inside the route file using express.raw()
 */
app.use('/api/webhook', webhookRoutes);

// Global JSON parser for all other routes
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Metric API Server is running!',
    version: '1.0.0'
  });
});

const startServer = async () => {
  try {
    // Check DB connection
    await db.execute('SELECT 1'); 
    app.listen(PORT, () => {
      console.log(`✅ Database verified and server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1);
  }
};

startServer();