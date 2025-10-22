import React from 'react';
import { Layout } from 'antd';
import { PropertySearchBar } from '~/features/property/components';
import './Header.scss';

const { Header: AntHeader } = Layout;

export interface Props {
  onSearch?: (query: string) => void;
  onPriceRangeChange?: (min: number | undefined, max: number | undefined) => void;
  minPrice?: number;
  maxPrice?: number;
}

export const Header: React.FC<Props> = ({ 
  onSearch, 
  onPriceRangeChange,
  minPrice,
  maxPrice
}) => {
  return (
    <AntHeader className="header">
      <div className="header__brand">Million Property</div>
      <div className="header__search">
        <PropertySearchBar 
          placeholder="Buscar propiedades por nombre o dirección" 
          onSearch={onSearch}
          onPriceRangeChange={onPriceRangeChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </AntHeader>
  );
};

export default Header;

