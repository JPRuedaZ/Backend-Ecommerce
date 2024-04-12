import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv";
import { registerAs } from "@nestjs/config";
import { User } from "src/entities/User";
import { Product } from "src/entities/Product";
import { Order } from "src/entities/Order";
import { OrderDetail } from "src/entities/OrderDetail";
import { Category } from "src/entities/Category";

dotenvConfig({ path: './.env' });

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    dropSchema: false,
    entities: [User, Product, Order, OrderDetail, Category],
    migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions)