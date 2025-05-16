import { render, screen, fireEvent } from '@testing-library/vue';
import ToggleComponent from '../ToggleComponent.vue';

test('muestra el texto al hacer clic', async () => {
    render(ToggleComponent);

    // Verifica que el texto no esté inicialmente
    expect(screen.queryByText('Texto oculto')).not.toBeInTheDocument();

    // Simula clic en el botón
    await fireEvent.click(screen.getByText('Mostrar'));

    // Verifica que el texto aparezca
    expect(screen.getByText('Texto oculto')).toBeInTheDocument();

// En lugar de toBeInTheDocument:
    /*expect(screen.queryByText('Texto oculto')).toBeTruthy(); // Existe
    expect(screen.queryByText('Texto oculto')).toBeNull(); // No existe
    */
});
