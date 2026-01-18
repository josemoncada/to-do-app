import { FindOptionsOrder, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ToDo } from './entities/to-do.entity';
import { CreateToDoDto } from './dtos/create-to-do.dto';
import { UpdateToDoDto } from './dtos/update-to-do.dto';
import { NotFoundError, ForbiddenError } from '../../utils/errors.util';
import { ToDoDto } from './dtos/to-do.dto';
import { toToDoDto } from './mappers/to-do.mapper';
import { ToDoPaginationQuery } from './types/to-do-pagination-query.type';
import { PaginationResult } from '../../commons/pagination/pagination-result.type';
import { normalizePagination } from '../../commons/pagination/pagination.util';

export class ToDoService {

    constructor(private toDoRepository: Repository<ToDo>) {}

    async create(userId: string, createTodoDto: CreateToDoDto): Promise<ToDoDto> {
        
        const toDo = this.toDoRepository.create({
            ...createTodoDto,
            userId,
        });

        const toDoSaved = await this.toDoRepository.save(toDo);

        return toToDoDto(toDoSaved);
    }

    async update(todoId: string, userId: string, updateToDoDto: UpdateToDoDto): Promise<ToDoDto> {
        
        const toDo = await this.toDoRepository.findOne({
            where: { id: todoId },
        });

        if (!toDo) {
            throw new NotFoundError('Tarea no encontrada');
        }

        if (toDo.userId !== userId) {
            throw new ForbiddenError('No tienes permiso para actualizar esta tarea');
        }

        Object.assign(toDo, updateToDoDto);

        const toDoSaved = await this.toDoRepository.save(toDo);

        return toToDoDto(toDoSaved);

    }

    async list(userId: string, query: ToDoPaginationQuery): Promise<PaginationResult<ToDoDto>> {

        const { page, limit, search, sortBy, order, skip, take } = normalizePagination(query);

        const where: FindOptionsWhere<ToDo> = { userId };

        if (query.priority !== undefined && query.priority !== null) {
            where.priority = query.priority;
        }

        if (query.isCompleted !== undefined && query.isCompleted !== null) {
            const completed =
            typeof query.isCompleted === 'string'
                ? query.isCompleted === 'true'
                : Boolean(query.isCompleted);

            where.isCompleted = completed;
        }

        if (search) {
            where.name = ILike(`%${search}%`);
        }

        const orderBy = { [sortBy]: order } as FindOptionsOrder<ToDo>;

        const [entities, total] = await this.toDoRepository.findAndCount({
            where,
            skip,
            take,
            order: orderBy,
        });

        
        const data = entities.map(toToDoDto);

        return {
            data,
            pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getById(toDoId: string, userId: string): Promise<ToDoDto> {

        const toDo = await this.toDoRepository.findOne({
            where: { id: toDoId },
        });

        if (!toDo) {
            throw new NotFoundError('Tarea no encontrada');
        }

        if (toDo.userId !== userId) {
            throw new ForbiddenError('No tienes permiso para acceder a esta tarea');
        }

        return toToDoDto(toDo);
    }

    async delete(toDoId: string, userId: string): Promise<void> {
        const toDo = await this.toDoRepository.findOne({
            where: { id: toDoId },
        });

        if (!toDo) {
            throw new NotFoundError('Tarea no encontrada');
        }

        if (toDo.userId !== userId) {
            throw new ForbiddenError('No tienes permiso para eliminar esta tarea');
        }

        await this.toDoRepository.remove(toDo);
    }
}