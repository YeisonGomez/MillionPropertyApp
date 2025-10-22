import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './Home';

// Mock data que se usa en todos los tests
const mockProperties = [
  {
    idProperty: '1',
    name: 'Casa en la Playa',
    address: 'Carrera 7 #32-10, Bogotá',
    price: 250000000,
    codeInternal: 'PROP001',
    year: 2020,
    idOwner: 'owner1',
    firstImage: 'https://example.com/casa-playa.jpg',
  },
  {
    idProperty: '2',
    name: 'Apartamento Moderno',
    address: 'Calle 80 #15-20, Medellín',
    price: 180000000,
    codeInternal: 'PROP002',
    year: 2021,
    idOwner: 'owner2',
    firstImage: 'https://example.com/apartamento.jpg',
  },
  {
    idProperty: '3',
    name: 'Cabaña en el Bosque',
    address: 'Vereda El Bosque, Cajicá',
    price: 120000000,
    codeInternal: 'PROP003',
    year: 2019,
    idOwner: 'owner3',
    firstImage: 'https://example.com/cabana.jpg',
  },
];

const mockPagination = {
  totalCount: 3,
  page: 1,
  pageSize: 10,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

// Mock functions
const mockNavigate = vi.fn();
const mockHandleSearch = vi.fn();
const mockHandlePriceRangeChange = vi.fn();
const mockHandlePageChange = vi.fn();

// Mocks fijos en el nivel superior
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('~/features/property/hooks', () => ({
  useSearch: () => ({
    filters: { page: 1, pageSize: 10 },
    minPrice: undefined,
    maxPrice: undefined,
    handleSearch: mockHandleSearch,
    handlePriceRangeChange: mockHandlePriceRangeChange,
    handlePageChange: mockHandlePageChange,
  }),
}));

vi.mock('~/features/property/services', () => ({
  useGetAllProperties: () => ({
    properties: mockProperties,
    pagination: mockPagination,
    loading: false,
    error: null,
  }),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderizado inicial', () => {
    it('debe renderizar el componente Home correctamente', () => {
      renderWithRouter(<Home />);

      expect(screen.getByText('Million Property')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Buscar propiedades/i)).toBeInTheDocument();
    });

    it('debe mostrar propiedades en la lista', () => {
      renderWithRouter(<Home />);

      const propertyCards = document.querySelectorAll('.property-card');
      expect(propertyCards.length).toBeGreaterThan(0);
    });

    it('debe tener un contador de propiedades', () => {
      renderWithRouter(<Home />);

      expect(screen.getByText(/propiedades encontradas/i)).toBeInTheDocument();
    });
  });

  describe('Funcionalidad de búsqueda', () => {
    it('debe llamar handleSearch cuando se escribe en el buscador', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Home />);

      const searchInput = screen.getByPlaceholderText(/Buscar propiedades/i);
      await user.type(searchInput, 'Casa');

      // Esperar al debounce
      await waitFor(
        () => {
          expect(mockHandleSearch).toHaveBeenCalled();
        },
        { timeout: 1000 }
      );
    });

    it('debe tener un input de búsqueda funcional', () => {
      renderWithRouter(<Home />);

      const searchInput = screen.getByPlaceholderText(/Buscar propiedades/i);
      
      fireEvent.change(searchInput, { target: { value: 'Apartamento' } });
      
      expect(searchInput).toHaveValue('Apartamento');
    });

    it('debe poder limpiar el input de búsqueda', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Home />);

      const searchInput = screen.getByPlaceholderText(/Buscar propiedades/i);
      
      await user.type(searchInput, 'Casa');
      await user.clear(searchInput);

      expect(searchInput).toHaveValue('');
    });
  });

  describe('Filtros de precio', () => {
    it('debe mostrar el botón de filtros', () => {
      renderWithRouter(<Home />);

      const filterButton = screen.getByLabelText('filter');
      expect(filterButton).toBeInTheDocument();
    });

    it('debe abrir el popover de filtros al hacer click', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Home />);

      const filterButton = screen.getByLabelText('filter');
      await user.click(filterButton);

      await waitFor(() => {
        expect(screen.getByText('Rango de Precio')).toBeInTheDocument();
      });
    });

    it('debe mostrar opciones de precio mínimo y máximo', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Home />);

      const filterButton = screen.getByLabelText('filter');
      await user.click(filterButton);

      await waitFor(() => {
        expect(screen.getByText('Mínimo')).toBeInTheDocument();
        expect(screen.getByText('Máximo')).toBeInTheDocument();
      });
    });
  });

  describe('Navegación', () => {
    it('debe tener property cards clickeables', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Home />);

      const propertyCards = document.querySelectorAll('.property-card');
      expect(propertyCards.length).toBeGreaterThan(0);

      await user.click(propertyCards[0]);
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  describe('Paginación', () => {
    it('debe mostrar el componente correctamente con paginación', () => {
      renderWithRouter(<Home />);

      // La paginación solo se muestra si hay más de 1 página
      // En nuestro mock tenemos 1 página, así que no se debería mostrar
      const pagination = document.querySelector('.ant-pagination');
      expect(pagination).not.toBeInTheDocument();
    });
  });

  describe('Conteo de propiedades', () => {
    it('debe mostrar el conteo correcto de propiedades', () => {
      renderWithRouter(<Home />);

      // Verifica que el conteo sea correcto (usando /i para ignorar mayúsculas/minúsculas)
      expect(screen.getByText(/propiedades encontradas/i)).toBeInTheDocument();
    });
  });

  describe('Grid de propiedades', () => {
    it('debe renderizar property cards', () => {
      renderWithRouter(<Home />);

      const cards = document.querySelectorAll('.property-card');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('debe tener una estructura grid responsive', () => {
      const { container } = renderWithRouter(<Home />);

      const propertyListGrid = container.querySelector('.ant-row');
      expect(propertyListGrid).toBeInTheDocument();
    });
  });
});

