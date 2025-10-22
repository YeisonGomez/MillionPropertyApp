import React from 'react';
import { Card as AntCard } from 'antd';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  cover?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...rest }) => {
  return (
    <AntCard className={className} {...rest}>
      {children}
    </AntCard>
  );
};

export default Card;

