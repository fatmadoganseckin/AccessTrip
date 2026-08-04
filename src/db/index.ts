import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL || 'postgresql://accesstrip_owner:mock_neon_key@ep-mock.us-east-2.aws.neon.tech/accesstrip?sslmode=require');

export const db = drizzle(sql, { schema });
