import { describe, test, expect } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
    test('renders primary button correctly', () => {
        const button = new Button('Click me');
        expect(button.toHTML()).toMatchSnapshot();
    });

    test('renders secondary button correctly', () => {
        const button = new Button('Click me', 'secondary');
        expect(button.toHTML()).toMatchSnapshot();
    });

    test('renders danger button correctly', () => {
        const button = new Button('Delete', 'danger');
        expect(button.toHTML()).toMatchSnapshot();
    });

    test('renders button with custom text', () => {
        const button = new Button('Custom Text');
        expect(button.toHTML()).toMatchSnapshot();
    });

    test('button render object matches snapshot', () => {
        const button = new Button('Click me', 'primary');
        expect(button.render()).toMatchSnapshot();
    });
}); 