export function validateInput(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Inputs must be numbers');
    }
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        throw new Error('Inputs must be finite numbers');
    }
} 