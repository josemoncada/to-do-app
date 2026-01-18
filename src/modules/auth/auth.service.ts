import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { RegisterDto } from "./dtos/register.dto";
import { ConflictError, NotFoundError, UnauthorizedError } from "../../utils/errors.util";
import { comparePassword, hashPassword } from "../../utils/password.util";
import { UserDto } from "./dtos/user.dto";
import { toUserDto } from "./mappers/user.mapper";
import { LoginDto } from "./dtos/login.dto";

export class AuthService {

    

    constructor(private userRepository: Repository<User>) {}

    async register(registerDto: RegisterDto): Promise<UserDto> {

        const { name, email, password } = registerDto;

        const existingUser = await this.userRepository.findOne({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictError('El email ya está registrado');
        }

        const hashedPassword = await hashPassword(password);

        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        const userSaved = await this.userRepository.save(user);

        return toUserDto(userSaved);
    }

    async login(loginDto: LoginDto): Promise<UserDto> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedError('Credenciales inválidas');
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedError('Credenciales inválidas');
        }

        return toUserDto(user);
    }

  async getUserById(userId: string): Promise<UserDto> {

    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    });

    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }

    return toUserDto(user);
  }

}