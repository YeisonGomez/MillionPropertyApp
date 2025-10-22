import React from 'react';
import { Layout, Pagination } from 'antd';
import { Header, Typography } from '~/components';
import { PropertyList } from '~/features/property/components/PropertyList/PropertyList';
import { useSearch } from '~/features/property/hooks';
import { useGetAllProperties } from '~/features/property/services';
import './Home.scss';

const { Content } = Layout;

export const Home: React.FC = () => {
  const { 
    filters, 
    minPrice, 
    maxPrice, 
    handleSearch, 
    handlePriceRangeChange, 
    handlePageChange 
  } = useSearch();
  
  const { properties, pagination, loading } = useGetAllProperties(filters);

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
          </div>

          <PropertyList
            properties={properties}
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
