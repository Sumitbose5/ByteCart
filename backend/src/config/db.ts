import * as dotenv from 'dotenv';
import { drizzle } from "drizzle-orm/node-postgres"; 
import { Pool } from "pg"; 
import * as schema from "../drizzle/schema";

dotenv.config();

// Explicitly define connection details to avoid URL parsing errors
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ByteDB',
  password: 'bosesumit@2005', // Use the raw password here, no %40 needed
  port: 5432,
});

export const db = drizzle(pool, { schema });