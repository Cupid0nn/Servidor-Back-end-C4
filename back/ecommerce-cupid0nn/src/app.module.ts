import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/Auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './user/user.module';
import { OrdersModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { CategoryEntity } from './Entityes/Category.Entity';
import { ProductEntity } from './Entityes/Products.entity';
import { UserEntity } from './Entityes/User.entity';
import { OrderEntity } from './Entityes/Order.entity';
import { orderDetailsEntity } from './Entityes/OrderDetails.entity';
import { cloudinaryConfig } from './Cloudinary/cloudinary';
import { CloudinaryModule } from './Cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';

config({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'justicia3025',
      database: 'm4database',
      entities: [
        CategoryEntity,
        ProductEntity,
        UserEntity,
        orderDetailsEntity,
        OrderEntity,
      ],
      migrations: ['dist/migrations/*{.ts,.js}'], /// al crear migraciones crearlas en carpeta src/migrations
      // correr el run build para transpilar las migraciones
      synchronize: true,
      dropSchema: true,
      logging: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    CategoryModule,
    ProductModule,
    UsersModule,
    OrdersModule,
    OrderDetailModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, cloudinaryConfig],
})
export class AppModule {}
