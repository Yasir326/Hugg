import { calculatePagination } from '../utils/calculatePagination';
import { PaginatedResponse, Store } from '../types';
import { loadBrandsData } from './brandModel';

export async function getStoresByProductId(productId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Store>> {
  const brandsData = await loadBrandsData();

  const product = brandsData.embedded.products.find((p) => p.id === productId);
  if (!product) {
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      },
    };
  }

  const relatedBrands = brandsData.data.filter(brand => 
    brand.products.includes(productId) || brand.consolidated_products.includes(productId)
  );

  if (relatedBrands.length === 0) {
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      },
    };
  }
  const storeIds = relatedBrands.flatMap(brand => brand.stores);
  
  const allStores = brandsData.embedded.stores.filter(store => 
    storeIds.includes(store.id)
  );

  const { total, totalPages, startIndex, endIndex } = calculatePagination(allStores, limit, page);

  const stores = allStores.slice(startIndex, endIndex);

  return {
    data: stores,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}
