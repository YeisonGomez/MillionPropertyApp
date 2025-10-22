import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Popover, Slider, InputNumber, Row, Col } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import './PropertySearchBar.scss';
import { formatPriceUSD } from '~/shared/utils';

export interface Props {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  onPriceRangeChange?: (min: number | undefined, max: number | undefined) => void;
  minPrice?: number;
  maxPrice?: number;
  debounceDelay?: number;
}

export const PropertySearchBar: React.FC<Props> = ({ 
  placeholder = 'Buscar propiedades',
  className = '', 
  onSearch,
  onPriceRangeChange,
  minPrice,
  maxPrice,
  debounceDelay = 500
}) => {
  const [query, setQuery] = useState('');
  const [minValue, setMinValue] = useState<number | undefined>(minPrice);
  const [maxValue, setMaxValue] = useState<number | undefined>(maxPrice);
  const [sliderValue, setSliderValue] = useState<[number, number]>([minPrice ?? 0, maxPrice ?? 1000000000]);
  const [filterVisible, setFilterVisible] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const MIN_PRICE = 0;
  const MAX_PRICE = 1000000000;

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onSearch?.(query);
    }, debounceDelay);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, onSearch, debounceDelay]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (debounceTimer.current) 
        clearTimeout(debounceTimer.current);
      onSearch?.(query);
    }
  };

  const handleSliderChange = (value: [number, number]) => {
    setSliderValue(value);
  };

  const handleSliderAfterChange = (value: [number, number]) => {
    const [newMin, newMax] = value;
    const finalMin = newMin === MIN_PRICE ? undefined : newMin;
    const finalMax = newMax === MAX_PRICE ? undefined : newMax;
    setMinValue(finalMin);
    setMaxValue(finalMax);
    onPriceRangeChange?.(finalMin, finalMax);
  };

  const handleMinChange = (value: number | null) => {
    const newMin = value === null || value === MIN_PRICE ? undefined : value;
    setMinValue(newMin);
    setSliderValue([newMin ?? MIN_PRICE, maxValue ?? MAX_PRICE]);
    onPriceRangeChange?.(newMin, maxValue);
  };

  const handleMaxChange = (value: number | null) => {
    const newMax = value === null || value === MAX_PRICE ? undefined : value;
    setMaxValue(newMax);
    setSliderValue([minValue ?? MIN_PRICE, newMax ?? MAX_PRICE]);
    onPriceRangeChange?.(minValue, newMax);
  };

  const handleClearFilters = () => {
    setMinValue(undefined);
    setMaxValue(undefined);
    setSliderValue([MIN_PRICE, MAX_PRICE]);
    onPriceRangeChange?.(undefined, undefined);
  };

  const filterContent = (
    <div className="property-search-bar__filter-content">
      <div className="property-search-bar__filter-header">
        <span className="property-search-bar__filter-title">Rango de Precio</span>
        <Button 
          type="link" 
          size="small" 
          onClick={handleClearFilters}
          className="property-search-bar__clear-btn"
        >
          Limpiar
        </Button>
      </div>
      
      <Slider
        range
        min={MIN_PRICE}
        max={MAX_PRICE}
        value={sliderValue}
        onChange={(value) => handleSliderChange(value as [number, number])}
        onAfterChange={(value) => handleSliderAfterChange(value as [number, number])}
        step={10000000}
        tooltip={{
          formatter: (value) => formatPriceUSD(value ?? 0),
        }}
        className="property-search-bar__slider"
      />

      <Row gutter={12} className="property-search-bar__inputs">
        <Col span={12}>
          <label className="property-search-bar__input-label">Mínimo</label>
          <InputNumber
            min={MIN_PRICE}
            max={maxValue ?? MAX_PRICE}
            value={minValue}
            onChange={handleMinChange}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
            className="property-search-bar__price-input"
            placeholder="Sin mínimo"
          />
        </Col>
        <Col span={12}>
          <label className="property-search-bar__input-label">Máximo</label>
          <InputNumber
            min={minValue ?? MIN_PRICE}
            max={MAX_PRICE}
            value={maxValue}
            onChange={handleMaxChange}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
            className="property-search-bar__price-input"
            placeholder="Sin máximo"
          />
        </Col>
      </Row>
    </div>
  );

  const hasFilters = minValue !== undefined || maxValue !== undefined;

  return (
    <div className={`property-search-bar ${className}`.trim()}>
      <Input
        value={query}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        allowClear
        prefix={<SearchOutlined />}
        suffix={
          <Popover
            content={filterContent}
            trigger="click"
            placement="bottomRight"
            open={filterVisible}
            onOpenChange={setFilterVisible}
            overlayClassName="property-search-bar__filter-popover"
          >
            <Button
              type={hasFilters ? 'primary' : 'text'}
              icon={<FilterOutlined />}
              size="small"
              className="property-search-bar__filter-btn"
            />
          </Popover>
        }
        className="property-search-bar__input"
        size="large"
      />
    </div>
  );
};

export default PropertySearchBar;

