import React from 'react';
import { Select } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';
import type { SortOption } from '~/features/property/hooks/useSearch';
import './PropertySort.scss';

export interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

export const PropertySort: React.FC<Props> = ({ value, onChange, className = '' }) => {
  const options = [
    { value: 'name-asc', label: 'Nombre (A-Z)' },
    { value: 'name-desc', label: 'Nombre (Z-A)' },
    { value: 'price-asc', label: 'Precio (Menor a Mayor)' },
    { value: 'price-desc', label: 'Precio (Mayor a Menor)' },
  ];

  return (
    <div className={`property-sort ${className}`.trim()}>
      <SortAscendingOutlined className="property-sort__icon" />
      <Select
        value={value}
        onChange={onChange}
        options={options}
        className="property-sort__select"
      />
    </div>
  );
};

