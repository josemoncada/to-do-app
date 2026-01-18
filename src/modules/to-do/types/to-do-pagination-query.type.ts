import { PaginationQuery } from "../../../commons/pagination/pagination-query.type";
import { PriorityEnum } from "../entities/to-do.entity";

export interface ToDoPaginationQuery extends PaginationQuery {
  priority?: PriorityEnum;
  isCompleted?: string;
}