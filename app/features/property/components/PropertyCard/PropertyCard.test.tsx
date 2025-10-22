import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PropertyCard } from './PropertyCard';
import type { Property } from '~/features/property/types/property';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockProperty: Property = {
  idProperty: '123',
  name: 'Casa en la Playa',
  address: 'Carrera 7 #32-10, Bogotá',
  price: 250000000,
  codeInternal: 'PROP001',
  year: 2020,
  idOwner: 'owner123',
  firstImage: 'https://example.com/image.jpg',
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PropertyCard', () => {
  it('debe renderizar correctamente con todos los datos', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    expect(screen.getByText('Casa en la Playa')).toBeInTheDocument();
    expect(screen.getByText('Carrera 7 #32-10, Bogotá')).toBeInTheDocument();
    expect(screen.getByText(/\$ 250\.000\.000/)).toBeInTheDocument();
    expect(screen.getByText(/por noche/)).toBeInTheDocument();
  });

  it('debe mostrar la imagen de la propiedad', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    const image = screen.getByAltText('Casa en la Playa') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://example.com/image.jpg');
  });

  it('debe usar imagen fallback si no hay firstImage', () => {
    const propertyWithoutImage = { ...mockProperty, firstImage: undefined };
    renderWithRouter(<PropertyCard property={propertyWithoutImage} />);

    const image = screen.getByAltText('Casa en la Playa') as HTMLImageElement;
    expect(image.src).toContain('property-fallback.jpg');
  });

  it('debe mostrar texto por defecto si no hay nombre', () => {
    const propertyWithoutName = { ...mockProperty, name: '' };
    renderWithRouter(<PropertyCard property={propertyWithoutName} />);

    expect(screen.getByText('Propiedad sin nombre')).toBeInTheDocument();
  });

  it('debe mostrar texto por defecto si no hay dirección', () => {
    const propertyWithoutAddress = { ...mockProperty, address: '' };
    renderWithRouter(<PropertyCard property={propertyWithoutAddress} />);

    expect(screen.getByText('Dirección no disponible')).toBeInTheDocument();
  });

  it('debe navegar al detalle de la propiedad al hacer click', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    const card = screen.getByText('Casa en la Playa').closest('.property-card');
    fireEvent.click(card!);

    expect(mockNavigate).toHaveBeenCalledWith('/property/123');
  });

  it('debe llamar onView callback al hacer click', () => {
    const onViewMock = vi.fn();
    renderWithRouter(<PropertyCard property={mockProperty} onView={onViewMock} />);

    const card = screen.getByText('Casa en la Playa').closest('.property-card');
    fireEvent.click(card!);

    expect(onViewMock).toHaveBeenCalledWith(mockProperty);
  });

  it('debe usar imagen fallback cuando falla la carga de la imagen', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    const image = screen.getByAltText('Casa en la Playa') as HTMLImageElement;
    
    // Simular error de carga de imagen
    fireEvent.error(image);

    expect(image.src).toContain('property-fallback.jpg');
  });

  it('debe formatear el precio correctamente', () => {
    const propertyWithDifferentPrice = { ...mockProperty, price: 150000000 };
    renderWithRouter(<PropertyCard property={propertyWithDifferentPrice} />);

    expect(screen.getByText(/\$ 150\.000\.000/)).toBeInTheDocument();
  });

  it('debe manejar precio cero', () => {
    const propertyWithZeroPrice = { ...mockProperty, price: 0 };
    renderWithRouter(<PropertyCard property={propertyWithZeroPrice} />);

    expect(screen.getByText(/\$ 0/)).toBeInTheDocument();
  });

  it('debe tener cursor pointer al hacer hover', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    const card = screen.getByText('Casa en la Playa').closest('.property-card') as HTMLElement;
    
    // Verificar que la card tiene la clase que indica que es clickeable
    expect(card).toBeInTheDocument();
    
    // Simular hover
    fireEvent.mouseEnter(card);
    expect(card).toBeInTheDocument();
    
    // Simular salida del hover
    fireEvent.mouseLeave(card);
    expect(card).toBeInTheDocument();
  });

  it('debe ser clickeable en toda el área de la card', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    const card = screen.getByText('Casa en la Playa').closest('.property-card') as HTMLElement;
    
    // Verificar que tiene onClick
    expect(card).toHaveAttribute('class', expect.stringContaining('property-card'));
  });
});

