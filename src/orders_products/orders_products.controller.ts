import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersProductsService } from './orders_products.service';
import { CreateOrdersProductDto } from './dto/create-orders_product.dto';
import { UpdateOrdersProductDto } from './dto/update-orders_product.dto';

@Controller('orders-products')
export class OrdersProductsController {
  constructor(private readonly ordersProductsService: OrdersProductsService) {}

  @Post()
  create(@Body() createOrdersProductDto: CreateOrdersProductDto) {
    return this.ordersProductsService.create(createOrdersProductDto);
  }

  @Get()
  findAll() {
    return this.ordersProductsService.findAll();
  }

  @Get('/list/listproducts')
  findListProducts() {
    return this.ordersProductsService.findListProducts();
  }

  @Get('/list/orderbyproduct/:product')
  findOrderByProduct(@Param('product') product: string) {
    return this.ordersProductsService.findOrdersByProducts(product);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersProductsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrdersProductDto: UpdateOrdersProductDto,
  ) {
    return this.ordersProductsService.update(+id, updateOrdersProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersProductsService.remove(+id);
  }
}
