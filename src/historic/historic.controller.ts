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
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { CreateHistoricDto } from './dto/create-historic.dto';
import { HistoricService } from './historic.service';
import { getDeviceIP } from 'src/utils/getDeviceIP';

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
    const now = new Date();

    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );

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
    try {
      const apiAddress = await getDeviceIP(this.logger);

      if (apiAddress) {
        const response = await lastValueFrom(this.httpService.get(apiAddress));

        const { data } = response;

        const historic = {
          steps_amount: data.steps,
          time: new Date(data.time),
          dog_id: '1fcbaf0d-590b-4440-b4c1-e3c665eafb3e',
        } as CreateHistoricDto;

        await this.historicService.create(historic);
        this.logger.log('Data fetched and stored successfully.');
      } else {
        this.logger.warn('No pedometer endpoint found');
      }
    } catch (error) {
      this.logger.error('Error fetching data from remote server', error);
    }
  }
}
