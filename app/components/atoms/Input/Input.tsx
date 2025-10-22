import React from 'react';
import { Input as AntInput } from 'antd';

export interface InputProps {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  onPressEnter?: () => void;
}

export const Input: React.FC<InputProps> = ({ value, placeholder, className = '', onChange, onPressEnter }) => {
  return (
    <AntInput
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      onPressEnter={onPressEnter}
    />
  );
};

export default Input;

