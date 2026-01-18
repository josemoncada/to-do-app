import { FastifyReply, FastifyRequest } from 'fastify';
import { ToDoService } from './to-do.service';
import { validateDto, transformAndValidateDto } from '../../utils/validation.util';
import { CustomValidationError } from '../../utils/errors.util';
import { CreateToDoDto } from './dtos/create-to-do.dto';
import { UpdateToDoDto } from './dtos/update-to-do.dto';
import { ToDoPaginationQuery } from './types/to-do-pagination-query.type';

export class ToDoController {
  

  constructor(private toDoService: ToDoService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    
    const validation = await validateDto(CreateToDoDto, request.body);

    if (!validation.isValid) {
      throw new CustomValidationError(validation.errors || []);
    }

    const createTodoDto = transformAndValidateDto(CreateToDoDto, request.body);
    
    const userId = request.user.userId;

    const toDo = await this.toDoService.create(userId, createTodoDto);

    return reply.status(201).send({
      success: true,
      message: 'Tarea creada exitosamente',
      data: toDo,
    });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    
    const { id } = request.params as { id: string };

    const validation = await validateDto(UpdateToDoDto, request.body);
    if (!validation.isValid) {
      throw new CustomValidationError(validation.errors || []);
    }

    const updateTodoDto = transformAndValidateDto(UpdateToDoDto, request.body);
    const userId = request.user.userId;

    const toDo = await this.toDoService.update(id, userId, updateTodoDto);

    return reply.status(200).send({
      success: true,
      message: 'Tarea actualizada exitosamente',
      data: toDo,
    });
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.userId;
    const query = request.query as ToDoPaginationQuery;

    const result = await this.toDoService.list(userId, query);

    return reply.status(200).send({
      success: true,
      message: 'Lista de tareas',
      data: result.data,
      pagination: result.pagination,
    });
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const userId = request.user.userId;

    const toDo = await this.toDoService.getById(id, userId);

    return reply.status(200).send({
      success: true,
      message: 'Tarea encontrada',
      data: toDo,
    });
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const userId = request.user.userId;

    await this.toDoService.delete(id, userId);

    return reply.status(200).send({
      success: true,
      message: 'Tarea eliminada exitosamente',
    });
  }
}
