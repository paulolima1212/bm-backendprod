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
        obs: true,
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
        obs: true,
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
    ENCOMENDAS DE NATAL | BOLACHA MARIA

    O seu pedido tem o Nº ${data.id} e estará pronto
    no dia ${dateFormatter.format(new Date(data.dateDelivery))}.
    
    Pedido: ${products}

    Deve fornecer este número para qualquer alteração 
    e no momento do levantamento.

    Dúvidas/alterações contacte 935355240 (chamada para a rede móvel nacional).

    Obrigada e Boas Festas!

    `;

    sendMessages({
      message,
      dest: data.contact,
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
