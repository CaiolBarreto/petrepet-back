import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { DogsService } from 'src/dogs/dogs.service';
import { HistoricService } from 'src/historic/historic.service';

@Controller('analyzer')
export class AnalyzerController {
  constructor(
    private readonly httpService: HttpService,
    private readonly dogsService: DogsService,
    private readonly historicService: HistoricService,
  ) {}

  @Get(':dog_id')
  async analyzeDog(@Param('dog_id') dog_id: string) {
    try {
      const { age, weight, bcs_index } = await this.dogsService.findOne(dog_id);

      const lastWeekStepsData = await this.historicService.findLastWeekTotal(
        dog_id,
      );
      const lastStepsArray = lastWeekStepsData.dailyTotals.map(
        (day) => day.steps_amount,
      );

      const dataToAnalyze = {
        age,
        weight,
        bcs_index,
        last_steps: lastStepsArray,
        steps_goal: 8000,
      };

      const response = await lastValueFrom(
        this.httpService.post(
          `https://petrepet-analyzer.onrender.com/analyzer`,
          dataToAnalyze,
        ),
      );

      const { data } = response;
      return data;
    } catch (error) {
      console.error('Error fetching data from analyzer', error);
    }
  }
}
