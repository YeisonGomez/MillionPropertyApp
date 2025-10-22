import type { Property, PropertyImage } from '~/features/property/types/property';

export interface PaginatedPropertiesResult {
  items: Property[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetAllPropertiesResponse {
  properties: PaginatedPropertiesResult;
}

export interface GetAllPropertiesVariables {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}

export interface GetPropertyByIdResponse {
  property: Property & {
    images?: string[];
  };
}

export interface GetPropertyByIdVariables {
  id: string;
}

