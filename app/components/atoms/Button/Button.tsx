import React from 'react';
import { Button as AntButton } from 'antd';

export interface ButtonProps {
  children?: React.ReactNode;
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed';
  htmlType?: 'button' | 'submit' | 'reset';
  danger?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => {
  return (
    <AntButton className={className} {...rest}>
      {children}
    </AntButton>
  );
};

export default Button;

