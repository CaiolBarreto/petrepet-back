import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateHistoricDto } from './dto/create-historic.dto';

@Injectable()
export class HistoricService {
  constructor(private prisma: PrismaService) {}

  async create(createHistoricDto: CreateHistoricDto) {
    return await this.prisma.historic.create({
      data: createHistoricDto,
    });
  }

  async find(id: string, startDate?: Date, endDate?: Date) {
    return await this.prisma.historic.findMany({
      where: {
        dog_id: id,
        time: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.historic.delete({ where: { id } });
  }
}
