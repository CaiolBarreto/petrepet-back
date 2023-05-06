import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Logger,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { startOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { CreateHistoricDto } from './dto/create-historic.dto';
import { HistoricService } from './historic.service';

@Controller('historic')
export class HistoricController {
  constructor(
    private readonly historicService: HistoricService,
    private readonly httpService: HttpService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() createHistoricDto: CreateHistoricDto) {
    return await this.historicService.create({
      ...createHistoricDto,
    });
  }

  @Get('/daily/:id')
  async findOne(@Param('id') dog_id: string) {
    const timezone = 'America/Sao_Paulo';

    const now = utcToZonedTime(new Date(), timezone);

    const midnight = startOfDay(now);

    const historic = await this.historicService.find(dog_id, midnight, now);

    if (!historic) {
      throw new HttpException('Historic not found', HttpStatus.NOT_FOUND);
    }

    return historic;
  }

  @Get('/last-week/:id')
  async findLastWeekTotal(@Param('id') dog_id: string) {
    const historic = await this.historicService.findLastWeekTotal(dog_id);

    return historic;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async getAndSaveData() {
    const timezone = 'America/Sao_Paulo';

    const now = utcToZonedTime(new Date(), timezone);

    try {
      const historic = {
        steps: Math.floor(Math.random() * 11),
        time: `${now}`,
        dog_id: 'a6124ccf-4903-4883-8cdf-bcde488688b1',
      };

      return await this.historicService.create(historic);
    } catch (error) {
      console.error('Error fetching data from remote server', error);
    }
  }
}
