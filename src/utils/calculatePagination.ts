import { Product, Store } from '@/types';

export const calculatePagination = (brands: Product[] | Store[], limit: number, page: number) => {
  const total = brands.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return { total, totalPages, startIndex, endIndex };
};

