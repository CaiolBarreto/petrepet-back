import { PartialType } from '@nestjs/mapped-types';
import { CreateDogDto } from './create-dog.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateDogDto extends PartialType(CreateDogDto) {
  @IsNotEmpty()
  name: string;
}
