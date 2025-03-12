import { promises as fs } from 'fs';
import path from 'path';
import { BrandsResponse, PaginatedResponse, Product } from '../types';
import { calculatePagination } from '../utils/calculatePagination';

export async function loadBrandsData(): Promise<BrandsResponse> {
  const filePath = path.join(__dirname, '../db/brands.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function getProductsByBrandId(brandId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Product>> {
  const brandsData = await loadBrandsData();
  const brand = brandsData.data.find((b) => b.id === brandId);

  if (!brand) {
    return {
      data: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    };
  }

  const productIds = [...brand.products, ...brand.consolidated_products];

  const allProducts = brandsData.embedded.products.filter((product) => productIds.includes(product.id));

  const { total, totalPages, startIndex, endIndex } = calculatePagination(allProducts, limit, page);

  const productsByBrand = allProducts.slice(startIndex, endIndex);

  return {
    data: productsByBrand,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}
