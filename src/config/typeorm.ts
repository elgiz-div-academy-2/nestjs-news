import { DataSource } from 'typeorm';
import config from '.';
import { join } from 'path';

export default new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.db,
  // url: config.databaseUrl,
  synchronize: true,
  entities: [join(__dirname, '../entities/*.entity.{ts,js}')],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  logging: true,
});
