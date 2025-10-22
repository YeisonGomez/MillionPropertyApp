import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Spin, Typography, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetPropertyById } from '~/features/property/services';
import { SEO } from '~/shared/components/SEO';
import { env } from '~/shared/config/env';
import { formatPriceUSD, formatDate } from '~/shared/utils';
import propertyFallback from '~/features/property/assets/property-fallback.jpg';
import './PropertyDetail.scss';

const { Content } = Layout;
const { Title, Text } = Typography;

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { property, loading, error } = useGetPropertyById(id || '');

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Layout className="property-detail">
        <Content className="property-detail__content">
          <div className="property-detail__loading">
            <Spin size="large" />
          </div>
        </Content>
      </Layout>
    );
  }

  if (error || !property) {
    return (
      <Layout className="property-detail">
        <Content className="property-detail__content">
          <div className="property-detail__container">
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={handleBack}
              className="property-detail__back-button"
            >
              Volver a propiedades
            </Button>
            <div className="property-detail__error">
              <Text>No se pudo cargar la propiedad</Text>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="property-detail">
      <SEO 
        title={property.name}
        description={`${property.name} en ${property.address}. Precio: ${formatPriceUSD(property.price)}. Año: ${property.year}. Encuentra más detalles sobre esta propiedad.`}
        keywords={`${property.name}, propiedad en ${property.address}, bienes raíces, ${property.year}`}
        ogImage={property.firstImage || propertyFallback}
        ogUrl={`${env.appUrl}/property/${property.idProperty}`}
        canonical={`${env.appUrl}/property/${property.idProperty}`}
      />
      <Content className="property-detail__content">
        <div className="property-detail__container">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            type="text"
            className="property-detail__back-button"
          >
            Volver
          </Button>
          
          <div className="property-detail__header">
            <Title level={2} className="property-detail__title">
              {property.name}
            </Title>
            <Text className="property-detail__address">
              {property.address}
            </Text>
          </div>

          <div className="property-detail__images">
            <div className="property-detail__main-image">
              <img 
                src={property.firstImage || propertyFallback} 
                alt={property.name}
                onError={(e) => {
                  e.currentTarget.src = propertyFallback;
                }}
              />
            </div>
            
            {property.images && property.images.length > 0 && (
              <div className="property-detail__side-images">
                {property.images.slice(1).map((img, index) => (
                  <div key={index} className="property-detail__side-image">
                    <img 
                      src={img} 
                      alt={`${property.name} - ${index + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = propertyFallback;
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="property-detail__info">
            <div className="property-detail__main-info">
              <div className="property-detail__price-section">
                <Text className="property-detail__price-label">Precio</Text>
                <Title level={2} className="property-detail__price">
                  {formatPriceUSD(property.price)}
                </Title>
              </div>

              <Divider />

              {property.owner && (
                <>
                  <div className="property-detail__owner">
                    <Title level={4}>Anfitrión</Title>
                    <div className="property-detail__owner-info">
                      <img 
                        src={property.owner.photo} 
                        alt={property.owner.name}
                        className="property-detail__owner-photo"
                      />
                      <div className="property-detail__owner-details">
                        <Text strong className="property-detail__owner-name">
                          {property.owner.name}
                        </Text>
                      </div>
                    </div>
                  </div>

                  <Divider />
                </>
              )}

              <Title level={4}>Detalles de la propiedad</Title>
              <div className="property-detail__details">
                <div className="property-detail__detail-item">
                  <Text strong>Año de construcción:</Text>
                  <Text>{property.year}</Text>
                </div>
              </div>

              {property.traces && property.traces.length > 0 && (
                <>
                  <Divider />

                  <Title level={4}>Historial de transacciones</Title>
                  <div className="property-detail__traces">
                    {property.traces.map((trace) => (
                      <div key={trace.idPropertyTrace} className="property-detail__trace-item">
                        <div className="property-detail__trace-header">
                          <Text strong className="property-detail__trace-name">
                            {trace.name}
                          </Text>
                          <Text className="property-detail__trace-date">
                            {formatDate(trace.dateSale)}
                          </Text>
                        </div>
                        <div className="property-detail__trace-details">
                          <div className="property-detail__trace-detail">
                            <Text className="property-detail__trace-label">Valor:</Text>
                            <Text strong className="property-detail__trace-value">
                              {formatPriceUSD(trace.value)}
                            </Text>
                          </div>
                          <div className="property-detail__trace-detail">
                            <Text className="property-detail__trace-label">Impuesto:</Text>
                            <Text className="property-detail__trace-tax">
                              {formatPriceUSD(trace.tax)}
                            </Text>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

