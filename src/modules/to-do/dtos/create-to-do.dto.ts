import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PriorityEnum } from '../entities/to-do.entity';

export class CreateToDoDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @IsNotEmpty({ message: 'La prioridad es requerida' })
  @IsEnum(PriorityEnum, {
    message: 'La prioridad debe ser: baja, media o alta',
  })
  priority: PriorityEnum;
}
