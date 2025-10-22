import React from 'react';
import { Row, Col, Spin, Empty } from 'antd';
import { PropertyCard } from '../PropertyCard/PropertyCard';
import type { Property } from '~/features/property/types/property';
import './PropertyList.scss';

interface Props {
  properties: Property[];
  loading?: boolean;
  className?: string;
}

export const PropertyList: React.FC<Props> = ({
  properties,
  loading = false,
  className = ''
}) => {
  
  if (loading) {
    return (
      <div className="property-list__loading">
        <Spin size="large" />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="property-list__empty">
        <Empty 
          description="No se encontraron propiedades"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className={`property-list ${className}`.trim()}>
      <Row gutter={[24, 24]}>
        {properties.map((property) => (
          <Col key={property.idProperty} xs={24} sm={12} md={8} lg={6}>
            <PropertyCard property={property}/>
          </Col>
        ))}
      </Row>
    </div>
  );
};

