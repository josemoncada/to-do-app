import type { PaginationQuery, ListOrder } from './pagination-query.type';

export function normalizePagination(q: PaginationQuery) {
  const page = Math.max(1, q.page ?? 1);
  const limit = Math.min(100, Math.max(1, q.limit ?? 10));
  const search = q.search?.trim() || undefined;

  const sortBy = q.sortBy?.trim() || 'createdAt';
  const order: ListOrder = q.order ?? 'DESC';

  return {
    page,
    limit,
    search,
    sortBy,
    order,
    skip: (page - 1) * limit,
    take: limit
  };
}