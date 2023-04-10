import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { getLastWeekDate } from 'src/utils/dates';
import { CreateHistoricDto } from './dto/create-historic.dto';

@Injectable()
export class HistoricService {
  constructor(private prisma: PrismaService) {}

  async create(createHistoricDto: CreateHistoricDto) {
    return await this.prisma.historic.create({
      data: createHistoricDto,
    });
  }

  async find(dog_id: string, startDate?: Date, endDate?: Date) {
    return await this.prisma.historic.findMany({
      where: {
        dog_id: dog_id,
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

  async findLastWeekTotal(dog_id: string) {
    const lastWeek = getLastWeekDate();

    const historic = await this.prisma.historic.findMany({
      where: {
        dog_id: dog_id,
        time: {
          gte: lastWeek,
        },
      },
    });

    const weekDays = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];

    const dailyTotals = Array(7).fill(0);

    let totalSteps = 0;

    historic.forEach((hist) => {
      const dayOfWeek = new Date(hist.time).getDay();

      dailyTotals[dayOfWeek] += hist.steps_amount;
      totalSteps += hist.steps_amount;
    });

    const dailyData = dailyTotals.map((total, index) => ({
      day: weekDays[index],
      steps_amount: total,
    }));

    const response = {
      dailyTotals: dailyData,
      totalSteps,
    };

    return response;
  }
}
