import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv";
import { registerAs } from "@nestjs/config";
import { User } from "src/entities/User.entity";
import { Product } from "src/entities/Product.entity";
import { Order } from "src/entities/Order.entity";
import { OrderDetail } from "src/entities/OrderDetail.entity";
import { Category } from "src/entities/Category.entity";

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
    dropSchema: true,
    entities: [User, Product, Order, OrderDetail, Category],
    migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions)