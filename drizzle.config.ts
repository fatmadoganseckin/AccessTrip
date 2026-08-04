import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || 'postgresql://accesstrip_owner:mock_neon_key@ep-mock.us-east-2.aws.neon.tech/accesstrip?sslmode=require',
  },
});
