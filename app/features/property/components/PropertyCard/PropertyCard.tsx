import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Property } from '~/features/property/types/property';
import { formatPrice } from '~/shared/utils';
import propertyFallback from '~/features/property/assets/property-fallback.jpg';
import './PropertyCard.scss';

export interface Props {
  property: Property;
  onView?: (property: Property) => void;
}

export const PropertyCard: React.FC<Props> = ({
  property,
  onView,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.idProperty}`);
    onView?.(property);
  };

  return (
    <div className="property-card" onClick={handleClick}>
      <div className="property-card__image-container">
        <img 
          className="property-card__image" 
          src={property.firstImage || propertyFallback} 
          alt={property.name || 'Propiedad'} 
          onError={(e) => {
            e.currentTarget.src = propertyFallback;
          }}
        />
      </div>
      
      <div className="property-card__content">
        <h3 className="property-card__name">
          {property.name || 'Propiedad sin nombre'}
        </h3>
        
        <p className="property-card__address">
          {property.address || 'Dirección no disponible'}
        </p>
        
        <p className="property-card__price">
          <span className="property-card__price-amount">
            {formatPrice(property.price || 0)}
          </span>
          {' por noche'}
        </p>
      </div>
    </div>
  );
};

