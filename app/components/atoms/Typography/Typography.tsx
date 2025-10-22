import React from 'react';
import { Typography as AntTypography } from 'antd';
import './Typography.scss';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
type Color = 'default' | 'primary' | 'secondary' | 'muted';

export interface TypographyProps {
  children?: React.ReactNode;
  variant?: Variant;
  color?: Color;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'default',
  className = ''
}) => {
  const classes = [`atom-typography`, `atom-typography--${variant}`, `atom-typography--${color}`, className]
    .filter(Boolean)
    .join(' ');

  if (variant === 'h1' || variant === 'h2' || variant === 'h3' || variant === 'h4') {
    const level = Number(variant.slice(1)) as 1 | 2 | 3 | 4;
    return (
      <AntTypography.Title className={classes} level={level}>
        {children}
      </AntTypography.Title>
    );
  }

  if (variant === 'caption') {
    return (
      <AntTypography.Text className={classes} type="secondary">
        {children}
      </AntTypography.Text>
    );
  }

  if (variant === 'body') {
    return (
      <AntTypography.Paragraph className={classes}>
        {children}
      </AntTypography.Paragraph>
    );
  }

  return <span className={classes}>{children}</span>;
};

export default Typography;

