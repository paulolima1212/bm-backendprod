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
import { Query } from '@nestjs/common/decorators';

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

  @Get('/list/orderbyproduct')
  findOrderByProduct(
    @Query()
    query: {
      description: string;
      weight: string;
      dateDelivery: string;
    },
  ) {
    const { description, weight, dateDelivery } = query;
    return this.ordersProductsService.findOrdersByProducts({
      description,
      weight,
      dateDelivery,
    });
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
