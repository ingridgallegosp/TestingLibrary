import { render, screen } from '@testing-library/vue';
import HelloWorld from '../HelloWorld.vue';
import {describe, expect, it} from 'vitest';

describe('HelloWorld', () => {
    it('renderiza el mensaje correctamente', () => {
        const msg = 'Hola Vue 3!';
        render(HelloWorld, { props: { msg } });

        // Verifica que el mensaje se muestre
        expect(screen.getByText(msg)).toBeInTheDocument();
    });
});