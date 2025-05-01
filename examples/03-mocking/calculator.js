import { validateInput } from './validator';
import { logger } from './logger';

export class Calculator {
    constructor() {
        this.history = [];
    }

    add(a, b) {
        validateInput(a, b);
        const result = a + b;
        this.history.push({ operation: 'add', a, b, result });
        logger.log(`Added ${a} and ${b} to get ${result}`);
        return result;
    }

    subtract(a, b) {
        validateInput(a, b);
        const result = a - b;
        this.history.push({ operation: 'subtract', a, b, result });
        logger.log(`Subtracted ${b} from ${a} to get ${result}`);
        return result;
    }

    multiply(a, b) {
        validateInput(a, b);
        const result = a * b;
        this.history.push({ operation: 'multiply', a, b, result });
        logger.log(`Multiplied ${a} by ${b} to get ${result}`);
        return result;
    }

    divide(a, b) {
        validateInput(a, b);
        if (b === 0) {
            throw new Error('Division by zero');
        }
        const result = a / b;
        this.history.push({ operation: 'divide', a, b, result });
        logger.log(`Divided ${a} by ${b} to get ${result}`);
        return result;
    }

    getHistory() {
        return [...this.history];
    }

    clearHistory() {
        this.history = [];
        logger.log('Calculator history cleared');
    }
} 