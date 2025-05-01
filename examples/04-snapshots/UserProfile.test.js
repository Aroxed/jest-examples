import { describe, test, expect } from 'vitest';
import { UserProfile } from './UserProfile';

describe('UserProfile Component', () => {
    const testUser = {
        name: 'John Doe',
        email: 'JOHN@example.com ',  // Note the uppercase and trailing space
        role: 'developer',           // Note the lowercase
        posts: 42000,               // Large number to show formatting
        comments: 128000            // Large number to show formatting
    };

    test('renders user profile with correct formatting', () => {
        const profile = new UserProfile(testUser);
        const output = profile.render();
        
        // This will create a snapshot of the formatted output
        // If any formatting changes, this test will fail
        expect(output).toMatchSnapshot();
    });

}); 