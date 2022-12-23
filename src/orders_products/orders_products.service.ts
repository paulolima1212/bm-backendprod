import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma';
import { client, sendMessages } from 'src/Messages/Twillio';
import { CreateOrdersProductDto } from './dto/create-orders_product.dto';
import { UpdateOrdersProductDto } from './dto/update-orders_product.dto';

@Injectable()
export class OrdersProductsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateOrdersProductDto) {
    const { client, contact, dateDelivery, statusOrder, totalOrder } = data;

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
          totalOrder,
          statusOrder,
        },
      });
    }

    for await (const product of data.products) {
      const newOrderProduct = await this.prisma.orders_products.create({
        data: {
          description: product.description,
          price: Number(String(product.price).replace(',', '.')),
          quantity: product.quantity,
          weight: product.weight,
          ordersId: data.id,
          obs: product.obs,
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
    const { client, contact, dateDelivery, products, statusOrder, totalOrder } =
      data;

    try {
      await this.prisma.orders_products.deleteMany({
        where: {
          ordersId: id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }

    await this.prisma.orders.update({
      where: {
        id,
      },
      data: {
        client: client,
        contact: contact,
        dateDelivery: dateDelivery,
        totalOrder: totalOrder,
        statusOrder: statusOrder,
      },
    });

    for await (const product of products) {
      await this.prisma.orders_products.create({
        data: {
          description: product.description,
          price: Number(String(product.price).replace(',', '.')),
          quantity: product.quantity,
          weight: product.weight,
          ordersId: id,
          obs: product.obs,
        },
      });
    }
  }

  async findOrdersByProducts({
    description,
    weight,
    dateDelivery,
  }: {
    description: string;
    weight: string;
    dateDelivery: string;
  }) {
    return await this.prisma.$queryRawUnsafe(`
      SELECT 
        o.id , o.client , o.dateDelivery , op.quantity , op.weight , op.obs 
      FROM 
        orders o 
      INNER JOIN	orders_products op 
        ON o.id = op.ordersId 
      WHERE 
        op.description LIKE '%${description}%' AND op.weight LIKE '%${weight}%' AND o.dateDelivery LIKE '%${dateDelivery}%' AND o.statusOrder = 'pendente'
      ORDER BY
        o.dateDelivery
    `);
  }

  async findListProducts() {
    return await this.prisma.$queryRawUnsafe(`
      SELECT 
        op.description, op.weight, SUM(op.quantity), LEFT(o.dateDelivery,10)
      FROM 
        orders_products op 
      INNER JOIN orders o 
        ON op.ordersId = o.id 
      WHERE 
        o.statusOrder = 'pendente'
      GROUP BY 
        op.description, op.weight,  LEFT(o.dateDelivery,10)
      ORDER BY 
        LEFT(o.dateDelivery, 10), op.description 
    `);
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
