import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma';
import { CreateOrdersProductDto } from './dto/create-orders_product.dto';
import { UpdateOrdersProductDto } from './dto/update-orders_product.dto';

@Injectable()
export class OrdersProductsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateOrdersProductDto) {
    const { client, contact, dateDelivery, statusOrder } = data;

    async function totalOrderToPay() {
      const totalOrderCalc = data.products.reduce((acc, product) => {
        acc = Number(product.price) + acc;
  
        return acc;
      }, 0);
      
      return await totalOrderCalc
    }



    const order = await this.prisma.orders.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!order) {
      const newOrder = await this.prisma.orders.create({
        data: {
          client,
          contact,
          dateDelivery,
          totalOrder: 100,
          statusOrder,
        },
      });
    }

    for (const product of data.products) {
      const price = Number(product.price.split('€')[0]);
      const newOrderProduct = await this.prisma.orders_products.create({
        data: {
          description: product.description,
          price,
          quantity: product.quantity,
          weight: product.weight,
          ordersId: data.id,
        },
      });
    }
  }

  findAll() {
    return `This action returns all ordersProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersProduct`;
  }

  async update(id: number, data: UpdateOrdersProductDto) {
    const { client, contact, dateDelivery, products, statusOrder } = data;

    try {
      await this.prisma.orders_products.deleteMany({
        where: {
          ordersId: id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }

    const totalOrderCalc = products.reduce((acc, product) => {
      acc = Number(product.price) + acc;

      return acc;
    }, 0);

    await this.prisma.orders.update({
      where: {
        id,
      },
      data: {
        client: client,
        contact: contact,
        dateDelivery: dateDelivery,
        totalOrder: totalOrderCalc,
        statusOrder: statusOrder,
      },
    });

    for await (const product of products) {
      const price = product.price.split('€')[0];
      await this.prisma.orders_products.create({
        data: {
          description: product.description,
          price,
          quantity: product.quantity,
          weight: product.weight,
          ordersId: id,
        },
      });
    }
  }

  async remove(id: number) {
    await this.prisma.orders.delete({
      where: {
        id,
      },
    });

    await this.prisma.orders_products.deleteMany({
      where: {
        ordersId: id,
      },
    });
  }
}
