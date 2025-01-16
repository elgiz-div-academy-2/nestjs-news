import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

export default {
  databaseUrl: process.env.DATABASE_URL,
};
