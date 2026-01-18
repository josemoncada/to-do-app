import { AppDataSource } from '../../database/data-source';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

export function buildAuthModule() {
  const userRepository = AppDataSource.getRepository(User);
  const authService = new AuthService(userRepository);
  const authController = new AuthController(authService);
  return { authController };
}