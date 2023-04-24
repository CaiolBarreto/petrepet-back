import { IsNotEmpty } from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tutor_id: string;
}
