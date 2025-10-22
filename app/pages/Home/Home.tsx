import React, { useMemo } from 'react';
import { Layout, Pagination } from 'antd';
import { Header, Typography } from '~/components';
import { PropertyList, PropertySort } from '~/features/property/components';
import { useSearch } from '~/features/property/hooks';
import { useGetAllProperties } from '~/features/property/services';
import './Home.scss';

const { Content } = Layout;

export const Home: React.FC = () => {
  const { 
    filters, 
    minPrice, 
    maxPrice,
    sortBy,
    handleSearch, 
    handlePriceRangeChange, 
    handlePageChange,
    handleSortChange
  } = useSearch();
  
  const { properties, pagination, loading } = useGetAllProperties(filters);

  const sortedProperties = useMemo(() => {
    if (!properties || properties.length === 0) return [];
    
    const sorted = [...properties];
    
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }, [properties, sortBy]);

  return (
    <Layout className="home">
      <Header 
        onSearch={handleSearch}
        onPriceRangeChange={handlePriceRangeChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      
      <Content className="home__content">
        <div className="home__container">
          <div className="home__header">
            <Typography variant="body" color="secondary" className="home__subtitle">
              {pagination.totalCount} {pagination.totalCount === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
            </Typography>
            <PropertySort 
              value={sortBy}
              onChange={handleSortChange}
            />
          </div>

          <PropertyList
            properties={sortedProperties}
            loading={loading}
          />

          {pagination.totalPages > 1 && (
            <div className="home__pagination">
              <Pagination
                current={pagination.page}
                total={pagination.totalCount}
                pageSize={pagination.pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                showTotal={(total, range) => 
                  `${range[0]}-${range[1]} de ${total} propiedades`
                }
              />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};
