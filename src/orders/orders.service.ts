import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma';
import { sendMessages } from 'src/Messages/Twillio';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { dateFormatter } from 'src/utils/formatter';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  create(data: CreateOrderDto) {
    return this.prisma.orders.create({
      data,
    });
  }

  findAll() {
    return this.prisma.orders.findMany({
      select: {
        id: true,
        client: true,
        contact: true,
        dateDelivery: true,
        totalOrder: true,
        statusOrder: true,
      },
      orderBy: {
        dateDelivery: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.orders.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        client: true,
        contact: true,
        statusOrder: true,
        createdAt: true,
        dateDelivery: true,
        totalOrder: true,
        products: true,
      },
    });
  }

  sendMessage(data: MessageDTO) {
    const products = data.products.reduce((acc, product) => {
      acc =
        acc +
        `
        
        ` +
        product.description +
        ' ' +
        product.weight +
        ' - ' +
        product.quantity;

      return acc;
    }, '');

    const message = `
    Bolacha Maria - Pedidos

    Olá ${data.client},

    seu pedido de Nº ${data.id}, 

    estará pronto no dia ${dateFormatter.format(new Date(data.dateDelivery))}. 
    
    Pedido: ${products}
    `;

    sendMessages({
      message,
      dest: '966434548',
    });
    return 'Ok';
  }

  update(id: number, data: UpdateOrderDto) {
    return 'This action updates a order';
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  findMaxOrderId() {
    return this.prisma.$queryRawUnsafe(`
    SELECT id FROM orders ORDER BY id DESC
  `);
  }
}
