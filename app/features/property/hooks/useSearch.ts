import { useState, useMemo, useCallback } from 'react';
import type { PropertyFilters } from '../services/useQueries';
import { PROPERTY_PAGE_SIZE } from '../constants/property';

export type SortOption = 'default' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(PROPERTY_PAGE_SIZE);
  
  const filters = useMemo<PropertyFilters>(() => {
    const query = searchQuery.trim();

    const baseFilters: PropertyFilters = {
      page,
      pageSize,
    };

    if (minPrice !== undefined) {
      baseFilters.minPrice = minPrice;
    }
    if (maxPrice !== undefined) {
      baseFilters.maxPrice = maxPrice;
    }

    if (query) {
      const numericValue = parseFloat(query);
      if (!isNaN(numericValue) && !minPrice && !maxPrice) {
        baseFilters.minPrice = numericValue;
        baseFilters.maxPrice = numericValue * 1.5;
      } else {
        baseFilters.query = query;
      }
    }

    return baseFilters;
  }, [searchQuery, minPrice, maxPrice, page, pageSize]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, []);

  const handlePriceRangeChange = useCallback((min: number | undefined, max: number | undefined) => {
    setMinPrice(min);
    setMaxPrice(max);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortBy(newSort);
  }, []);

  return {
    searchQuery,
    filters,
    page,
    pageSize,
    minPrice,
    maxPrice,
    sortBy,
    handleSearch,
    handlePriceRangeChange,
    handlePageChange,
    handleSortChange,
  };
};
