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
    const historic = await this.prisma.historic.findMany({
      where: {
        dog_id: dog_id,
        time: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    let totalSteps = 0;

    const dailyStepGoal = 8000;

    const ranges: { [key: string]: string } = {
      '0-49': 'Podemos fazer melhor',
      '50-79': 'Quero andar mais',
      '80-99': 'Quase lá',
      '100': 'Meta batida',
    };

    historic.forEach((hist) => {
      totalSteps += hist.steps_amount;
    });

    const progress = (totalSteps / dailyStepGoal) * 100;

    const status = Object.entries(ranges).find(([range]) => {
      const [lower, upper] = range
        .split('-')
        .map((number) => parseInt(number, 10));
      console.log(lower <= progress && progress <= upper);
      return lower <= progress && progress <= upper;
    });

    const response = {
      ...historic,
      totalSteps,
      progress,
      dailyGoalStatus: status[1],
    };

    return response;
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
