import { PartialType } from '@nestjs/mapped-types';
import { CreateDogDto } from './create-dog.dto';
import { IsNotEmpty, IsInt, IsNumber } from 'class-validator';

export class UpdateDogDto extends PartialType(CreateDogDto) {
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
}
