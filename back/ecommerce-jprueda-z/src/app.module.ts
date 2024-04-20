import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { FileUploadModule } from './modules/files/file-upload.module';
import { JwtModule } from '@nestjs/jwt';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
      
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ConfigService.get('typeorm'),
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FileUploadModule,
    JwtModule.register({global: true, signOptions: { expiresIn: '1h' }, secret: process.env.JWT_SECRET}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {}

