import { AppDataSource } from '../../database/data-source';
import { ToDo } from './entities/to-do.entity';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';

export function buildToDoModule() {
  const toDoRepository = AppDataSource.getRepository(ToDo);
  const toDoService = new ToDoService(toDoRepository);
  const toDoController = new ToDoController(toDoService);
  return { toDoController };
}