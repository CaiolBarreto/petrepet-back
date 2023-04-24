import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  bcs_index: number;

  @IsNotEmpty()
  tutor_id: string;
}
