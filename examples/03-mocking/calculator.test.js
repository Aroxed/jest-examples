import { describe, test, expect, vi, beforeEach } from 'vitest';
import { Calculator } from './calculator';
import { validateInput } from './validator';
import { logger } from './logger';

// Mock the dependencies
vi.mock('./validator', () => ({
    validateInput: vi.fn()
}));

vi.mock('./logger', () => ({
    logger: {
        log: vi.fn(),
        error: vi.fn()
    }
}));

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
        // Clear all mocks before each test
        vi.clearAllMocks();
    });

    describe('Basic Operations', () => {
        test('adds two numbers correctly', () => {
            const result = calculator.add(2, 3);
            expect(result).toBe(5);
            expect(validateInput).toHaveBeenCalledWith(2, 3);
            expect(logger.log).toHaveBeenCalledWith('Added 2 and 3 to get 5');
        });

        test('subtracts two numbers correctly', () => {
            const result = calculator.subtract(5, 3);
            expect(result).toBe(2);
            expect(validateInput).toHaveBeenCalledWith(5, 3);
            expect(logger.log).toHaveBeenCalledWith('Subtracted 3 from 5 to get 2');
        });

        test('multiplies two numbers correctly', () => {
            const result = calculator.multiply(4, 3);
            expect(result).toBe(12);
            expect(validateInput).toHaveBeenCalledWith(4, 3);
            expect(logger.log).toHaveBeenCalledWith('Multiplied 4 by 3 to get 12');
        });

        test('divides two numbers correctly', () => {
            const result = calculator.divide(6, 2);
            expect(result).toBe(3);
            expect(validateInput).toHaveBeenCalledWith(6, 2);
            expect(logger.log).toHaveBeenCalledWith('Divided 6 by 2 to get 3');
        });
    });

    describe('Error Handling', () => {
        test('throws error when dividing by zero', () => {
            expect(() => calculator.divide(5, 0)).toThrow('Division by zero');
            expect(validateInput).toHaveBeenCalledWith(5, 0);
            expect(logger.log).not.toHaveBeenCalled();
        });

        test('validates input before operations', () => {
            validateInput.mockImplementationOnce(() => {
                throw new Error('Invalid input');
            });

            expect(() => calculator.add('2', 3)).toThrow('Invalid input');
            expect(validateInput).toHaveBeenCalledWith('2', 3);
            expect(logger.log).not.toHaveBeenCalled();
        });
    });

    describe('History Management', () => {
        test('maintains operation history', () => {
            calculator.add(2, 3);
            calculator.subtract(5, 2);
            
            const history = calculator.getHistory();
            expect(history).toHaveLength(2);
            expect(history[0]).toEqual({
                operation: 'add',
                a: 2,
                b: 3,
                result: 5
            });
            expect(history[1]).toEqual({
                operation: 'subtract',
                a: 5,
                b: 2,
                result: 3
            });
        });

        test('clears history', () => {
            calculator.add(2, 3);
            calculator.clearHistory();
            
            expect(calculator.getHistory()).toHaveLength(0);
            expect(logger.log).toHaveBeenCalledWith('Calculator history cleared');
        });
    });
}); 