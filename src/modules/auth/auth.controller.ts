import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";
import { transformAndValidateDto, validateDto } from "../../utils/validation.util";
import { RegisterDto } from "./dtos/register.dto";
import { CustomValidationError } from "../../utils/errors.util";
import { LoginDto } from "./dtos/login.dto";

export class AuthController {
    
    

    constructor(private authService : AuthService){}

    async register(request: FastifyRequest, reply: FastifyReply) {
        
        const validation = await validateDto(RegisterDto, request.body);
        if (!validation.isValid) {
            throw new CustomValidationError(validation.errors || []);
        }

        const registerDto = transformAndValidateDto(RegisterDto, request.body);
        const user = await this.authService.register(registerDto);
        
        const token = request.server.jwt.sign({
            userId: user.id,
            email: user.email
        });

        return reply.status(201).send({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
                user,
                token
            }
        });
    }

    async login(request: FastifyRequest, reply: FastifyReply) {
    
        const validation = await validateDto(LoginDto, request.body);
        
        if (!validation.isValid) {
            throw new CustomValidationError(validation.errors || []);
        }

        const loginDto = transformAndValidateDto(LoginDto, request.body);
        const user = await this.authService.login(loginDto);

        const token = request.server.jwt.sign({
            userId: user.id,
            email: user.email
        });

        return reply.status(200).send({
            success: true,
            message: 'Login exitoso',
            data: {
                user,
                token
            }
        });
    }

  async getMe(request: FastifyRequest, reply: FastifyReply) {

    const userId = request.user.userId;
    const user = await this.authService.getUserById(userId);
    
    return reply.status(200).send({
      success: true,
      message: 'Usuario autenticado',
      data: user
    });
  }
}