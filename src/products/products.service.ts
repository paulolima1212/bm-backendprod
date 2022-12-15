import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.prisma.products.findMany({
      distinct: ['type'],
      select: {
        type: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async findByName(name: string) {
    return await this.prisma.products.findMany({
      where: {
        type: {
          contains: name,
        },
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
