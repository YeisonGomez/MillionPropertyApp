import type { Property } from './property';

export interface PropertyCardProps {
  property: Property;
  onView?: (property: Property) => void;
  variant?: 'default' | 'compact' | 'detailed';
}
