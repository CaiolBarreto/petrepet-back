import { IsOptional, IsDateString } from 'class-validator';

export class GetHistoricDto {
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
