import { ToDoDto } from '../dtos/to-do.dto';
import { ToDo } from '../entities/to-do.entity';

export const toToDoDto = (t: ToDo): ToDoDto => ({
    id: t.id,
    name: t.name,
    priority: t.priority,
    isCompleted: t.isCompleted,
    userId: t.userId,
    createdAt: t.createdAt?.toISOString?.() ?? String(t.createdAt),
    updatedAt: t.updatedAt?.toISOString?.() ?? String(t.updatedAt)
});