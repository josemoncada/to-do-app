import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export const toUserDto = (u: User): UserDto => ({
  id: u.id,
  email: u.email,
  name: u.name,
  createdAt: u.createdAt?.toISOString?.() ?? String(u.createdAt),
  updatedAt: u.updatedAt?.toISOString?.() ?? String(u.updatedAt)
});