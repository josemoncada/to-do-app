export type ListOrder = 'ASC' | 'DESC';

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: ListOrder;
}