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
import { GetHistoricDto } from './dto/get-historic-dto';
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

  @Get(':id')
  async findOne(
    @Param('id') dog_id: string,
    @Body() getHistoricDto: GetHistoricDto,
  ) {
    const { start_date, end_date } = getHistoricDto;

    const historic = await this.historicService.find(
      dog_id,
      start_date ? new Date(start_date) : undefined,
      end_date ? new Date(end_date) : undefined,
    );

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

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async getAndSaveData() {
  //   try {
  //     const response = await lastValueFrom(
  //       this.httpService.get(
  //         'https://64395c831b9a7dd5c965b389.mockapi.io/api/pedometer',
  //       ),
  //     );
  //     const { data } = response;

  //     if (!Array.isArray(data)) {
  //       throw new Error('Response data is not an array');
  //     }

  //     for (const item of data) {
  //       const historic = {
  //         steps_amount: item.steps,
  //         time: new Date(item.time),
  //         dog_id: '1fcbaf0d-590b-4440-b4c1-e3c665eafb3e',
  //       } as CreateHistoricDto;

  //       await this.historicService.create(historic);
  //     }

  //     this.logger.debug('Called every 10 seconds');
  //   } catch (error) {
  //     console.error('Error fetching data from remote server', error);
  //   }
  // }
}
