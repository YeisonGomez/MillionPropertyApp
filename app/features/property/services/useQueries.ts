import { useQuery } from '@apollo/client/react';
import { GET_ALL_PROPERTIES, GET_PROPERTY_BY_ID } from './queries';
import type { 
  GetAllPropertiesResponse, 
  GetAllPropertiesVariables,
  GetPropertyByIdResponse,
  GetPropertyByIdVariables 
} from './types';

export interface PropertyFilters {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}

export const useGetAllProperties = (filters?: PropertyFilters) => {

  const cleanFilters = filters 
    ? Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => 
          value !== undefined && value !== null && value !== ''
        )
      )
    : undefined;  

  const { data, loading, error, refetch } = useQuery<
    GetAllPropertiesResponse,
    GetAllPropertiesVariables
  >(GET_ALL_PROPERTIES, {
    variables: cleanFilters as GetAllPropertiesVariables,
    skip: false,
  });

  return {
    properties: data?.properties.items ?? [],
    pagination: {
      totalCount: data?.properties.totalCount ?? 0,
      page: data?.properties.page ?? 1,
      pageSize: data?.properties.pageSize ?? 10,
      totalPages: data?.properties.totalPages ?? 0,
      hasNextPage: data?.properties.hasNextPage ?? false,
      hasPreviousPage: data?.properties.hasPreviousPage ?? false,
    },
    loading,
    error,
    refetch,
  };
};

export const useGetPropertyById = (id: string) => {
  const { data, loading, error, refetch } = useQuery<
    GetPropertyByIdResponse,
    GetPropertyByIdVariables
  >(GET_PROPERTY_BY_ID, {
    variables: { id },
    skip: !id,
  });

  return {
    property: data?.property,
    loading,
    error,
    refetch,
  };
};
