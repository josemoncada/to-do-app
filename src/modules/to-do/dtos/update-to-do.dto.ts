import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { PriorityEnum } from '../entities/to-do.entity';

export class UpdateToDoDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name?: string;

  @IsOptional()
  @IsEnum(PriorityEnum, {
    message: 'La prioridad debe ser: baja, media o alta',
  })
  priority?: PriorityEnum;

  @IsOptional()
  @IsBoolean({ message: 'Finalizada debe ser un valor booleano' })
  isCompleted?: boolean;
}
