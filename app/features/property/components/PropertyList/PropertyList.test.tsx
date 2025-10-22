import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PropertyList } from './PropertyList';
import type { Property } from '~/features/property/types/property';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const mockProperties: Property[] = [
  {
    idProperty: '1',
    name: 'Casa en la Playa',
    address: 'Carrera 7 #32-10, Bogotá',
    price: 250000000,
    codeInternal: 'PROP001',
    year: 2020,
    idOwner: 'owner1',
    firstImage: 'https://example.com/image1.jpg',
  },
  {
    idProperty: '2',
    name: 'Apartamento Moderno',
    address: 'Calle 80 #15-20, Medellín',
    price: 180000000,
    codeInternal: 'PROP002',
    year: 2021,
    idOwner: 'owner2',
    firstImage: 'https://example.com/image2.jpg',
  },
  {
    idProperty: '3',
    name: 'Cabaña en el Bosque',
    address: 'Vereda El Bosque, Cajicá',
    price: 120000000,
    codeInternal: 'PROP003',
    year: 2019,
    idOwner: 'owner3',
    firstImage: 'https://example.com/image3.jpg',
  },
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PropertyList', () => {
  it('debe mostrar loading state cuando loading es true', () => {
    renderWithRouter(<PropertyList properties={[]} loading={true} />);

    const loadingContainer = document.querySelector('.property-list__loading');
    expect(loadingContainer).toBeInTheDocument();
  });

  it('debe mostrar mensaje de empty state cuando no hay propiedades', () => {
    renderWithRouter(<PropertyList properties={[]} loading={false} />);

    expect(screen.getByText('No se encontraron propiedades')).toBeInTheDocument();
  });

  it('debe renderizar la lista de propiedades correctamente', () => {
    renderWithRouter(<PropertyList properties={mockProperties} />);

    expect(screen.getByText('Casa en la Playa')).toBeInTheDocument();
    expect(screen.getByText('Apartamento Moderno')).toBeInTheDocument();
    expect(screen.getByText('Cabaña en el Bosque')).toBeInTheDocument();
  });

  it('debe renderizar el número correcto de PropertyCards', () => {
    renderWithRouter(<PropertyList properties={mockProperties} />);

    const cards = screen.getAllByText(/Carrera|Calle|Vereda/);
    expect(cards).toHaveLength(3);
  });

  it('debe aplicar className personalizada', () => {
    const { container } = renderWithRouter(
      <PropertyList properties={mockProperties} className="custom-class" />
    );

    const propertyList = container.querySelector('.property-list');
    expect(propertyList).toHaveClass('custom-class');
  });

  it('no debe mostrar empty state cuando hay propiedades', () => {
    renderWithRouter(<PropertyList properties={mockProperties} />);

    expect(screen.queryByText('No se encontraron propiedades')).not.toBeInTheDocument();
  });

  it('debe manejar una sola propiedad correctamente', () => {
    renderWithRouter(<PropertyList properties={[mockProperties[0]]} />);

    expect(screen.getByText('Casa en la Playa')).toBeInTheDocument();
    expect(screen.queryByText('Apartamento Moderno')).not.toBeInTheDocument();
  });

  it('debe renderizar cada propiedad con su key única', () => {
    const { container } = renderWithRouter(<PropertyList properties={mockProperties} />);

    const cols = container.querySelectorAll('[class*="ant-col"]');
    expect(cols.length).toBeGreaterThanOrEqual(3);
  });
});
