import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { OrdersProductsModule } from './orders_products/orders_products.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [OrdersModule, OrdersProductsModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
