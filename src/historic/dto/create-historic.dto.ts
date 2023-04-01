import { IsNotEmpty } from 'class-validator';

export class CreateHistoricDto {
  @IsNotEmpty()
  steps_amount: number;

  @IsNotEmpty()
  dog_id: string;
}
