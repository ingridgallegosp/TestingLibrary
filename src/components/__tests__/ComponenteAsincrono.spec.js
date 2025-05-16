import { render, screen, waitFor } from '@testing-library/vue';
import ComponenteAsincrono from "@/components/ComponenteAsincrono.vue";
import { fetchData } from '../../api';

// Mock sobreescribe el archivo físico
vi.mock('../../api', () => ({
    fetchData: vi.fn(),
}));


describe('ComponenteAsincrono', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('muestra loader inicialmente', () => {
        render(ComponenteAsincrono);
        expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });

    test('verifica que fetchData se llame correctamente', async () => {
        // Mock de respuesta exitosa
        fetchData.mockResolvedValue([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ]);

        render(ComponenteAsincrono);

        // Espera a que se complete la llamada
        await waitFor(() => {
            expect(fetchData).toHaveBeenCalled(); // Verifica que se llamó
            expect(fetchData).toHaveBeenCalledTimes(1); // Verifica que se llamó una vez
            expect(fetchData).toHaveBeenCalledWith(); // Verifica que se llamó sin argumentos
        });
    });

    test('muestra datos correctamente', async () => {
        // Mock de respuesta exitosa
        fetchData.mockResolvedValue([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ]);

        render(ComponenteAsincrono);

        // Espera a que desaparezca el loader y verifica los datos
        await waitFor(() => {
            expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Datos:')).toBeInTheDocument();
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    test('maneja errores correctamente', async () => {
        // Mock de error
        fetchData.mockRejectedValue(new Error('API Error'));

        render(ComponenteAsincrono);

        await waitFor(() => {
            expect(screen.getByText('Error cargando datos')).toBeInTheDocument();
        });
    });
});