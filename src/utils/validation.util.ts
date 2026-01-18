import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

export async function validateDto<T extends object>(
  dtoClass: new () => T,
  data: any
): Promise<ValidationResult> {
  const dtoObject = plainToClass(dtoClass, data);
  const errors: ValidationError[] = await validate(dtoObject, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    const errorMessages = errors.flatMap((error) =>
      error.constraints ? Object.values(error.constraints) : []
    );
    return { isValid: false, errors: errorMessages };
  }

  return { isValid: true };
}

export function transformAndValidateDto<T extends object>(
  dtoClass: new () => T,
  data: any
): T {
  return plainToClass(dtoClass, data);
}
