import { IsNotEmpty, IsDate } from 'class-validator';

export class CreateHistoricDto {
  @IsNotEmpty()
  steps: number;

  @IsNotEmpty()
  dog_id: string;

  @IsNotEmpty()
  @IsDate()
  time: string;
}
