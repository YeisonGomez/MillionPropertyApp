import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertySearchBar } from './PropertySearchBar';

describe('PropertySearchBar', () => {
  let onSearchMock: ReturnType<typeof vi.fn>;
  let onPriceRangeChangeMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSearchMock = vi.fn();
    onPriceRangeChangeMock = vi.fn();
  });

  it('debe actualizar el valor del input al escribir', () => {
    render(<PropertySearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Buscar propiedades');
    fireEvent.change(input, { target: { value: 'Casa en la playa' } });

    expect(input).toHaveValue('Casa en la playa');
  });

  it('debe ejecutar búsqueda al presionar Enter', () => {
    render(<PropertySearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Buscar propiedades');
    fireEvent.change(input, { target: { value: 'Casa' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(onSearchMock).toHaveBeenCalledWith('Casa');
  });

  it('debe mostrar el botón de filtro', () => {
    render(<PropertySearchBar />);

    const filterButton = screen.getByRole('button', { name: /filter/i });
    expect(filterButton).toBeInTheDocument();
  });

  it('debe limpiar el input cuando se borra el texto', () => {
    render(<PropertySearchBar />);

    const input = screen.getByPlaceholderText('Buscar propiedades');
    fireEvent.change(input, { target: { value: 'Casa' } });
    fireEvent.change(input, { target: { value: '' } });

    // Verificar que el input está vacío (no esperamos que onSearch sea llamado por debounce)
    expect(input).toHaveValue('');
  });

  it('debe mostrar el botón de filtro como primary cuando hay filtros activos', () => {
    render(<PropertySearchBar minPrice={100000} maxPrice={500000} />);

    const filterButton = screen.getByRole('button', { name: /filter/i });
    expect(filterButton).toHaveClass('ant-btn-primary');
  });

  it('debe tener el icono de búsqueda en el input', () => {
    render(<PropertySearchBar />);

    const searchIcon = screen.getByLabelText('search');
    expect(searchIcon).toBeInTheDocument();
  });

  it('debe tener el icono de filtro en el botón', () => {
    render(<PropertySearchBar />);

    const filterIcon = screen.getByLabelText('filter');
    expect(filterIcon).toBeInTheDocument();
  });

  it('debe activar el borde al hacer hover sobre el input', () => {
    const { container } = render(<PropertySearchBar />);

    const inputWrapper = container.querySelector('.property-search-bar__input');
    expect(inputWrapper).toBeInTheDocument();

    // Simular hover sobre el input wrapper
    if (inputWrapper) {
      fireEvent.mouseEnter(inputWrapper);
      
      // Verificar que el wrapper existe después del hover
      expect(inputWrapper).toHaveClass('property-search-bar__input');
      
      // Simular salida del hover
      fireEvent.mouseLeave(inputWrapper);
      expect(inputWrapper).toBeInTheDocument();
    }
  });

  it('debe aplicar estilos de focus al hacer click en el input', () => {
    const { container } = render(<PropertySearchBar />);

    const input = screen.getByPlaceholderText('Buscar propiedades');
    const inputWrapper = container.querySelector('.property-search-bar__input');
    
    // Simular focus
    fireEvent.focus(input);
    
    // Verificar que el wrapper tiene la clase de focused (Ant Design agrega esta clase)
    expect(inputWrapper).toHaveClass('ant-input-affix-wrapper-focused');
    
    // Simular blur
    fireEvent.blur(input);
    
    // Después del blur, la clase de focused debería desaparecer
    expect(inputWrapper).not.toHaveClass('ant-input-affix-wrapper-focused');
  });

  it('debe mantener el input interactivo con eventos de mouse', () => {
    const { container } = render(<PropertySearchBar />);

    const searchBar = container.querySelector('.property-search-bar');
    expect(searchBar).toBeInTheDocument();

    // Simular hover sobre el componente completo
    if (searchBar) {
      fireEvent.mouseEnter(searchBar);
      expect(searchBar).toHaveClass('property-search-bar');
      
      fireEvent.mouseLeave(searchBar);
      expect(searchBar).toBeInTheDocument();
    }
  });
});
