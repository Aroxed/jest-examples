import { describe, test, expect, beforeEach } from 'vitest';
import { getUserById, getAllUsers, createUser, updateUser, deleteUser } from './userService';

describe('User Service', () => {
    beforeEach(() => {
        // Reset the users array before each test
        users.length = 0;
        users.push(
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        );
    });

    describe('getUserById', () => {
        test('returns user when found', async () => {
            const user = await getUserById(1);
            expect(user).toEqual({
                id: 1,
                name: 'John Doe',
                email: 'john@example.com'
            });
        });

        test('throws error when user not found', async () => {
            await expect(getUserById(999)).rejects.toThrow('User not found');
        });
    });

    describe('getAllUsers', () => {
        test('returns all users', async () => {
            const allUsers = await getAllUsers();
            expect(allUsers).toHaveLength(2);
            expect(allUsers[0].name).toBe('John Doe');
            expect(allUsers[1].name).toBe('Jane Smith');
        });
    });

    describe('createUser', () => {
        test('creates new user successfully', async () => {
            const newUser = await createUser({
                name: 'Bob Wilson',
                email: 'bob@example.com'
            });
            expect(newUser).toEqual({
                id: 3,
                name: 'Bob Wilson',
                email: 'bob@example.com'
            });
        });

        test('throws error when required fields are missing', async () => {
            await expect(createUser({ name: 'Bob' }))
                .rejects.toThrow('Name and email are required');
            await expect(createUser({ email: 'bob@example.com' }))
                .rejects.toThrow('Name and email are required');
        });
    });

    describe('updateUser', () => {
        test('updates user successfully', async () => {
            const updatedUser = await updateUser(1, { name: 'John Updated' });
            expect(updatedUser).toEqual({
                id: 1,
                name: 'John Updated',
                email: 'john@example.com'
            });
        });

        test('throws error when user not found', async () => {
            await expect(updateUser(999, { name: 'New Name' }))
                .rejects.toThrow('User not found');
        });
    });

    describe('deleteUser', () => {
        test('deletes user successfully', async () => {
            const deletedUser = await deleteUser(1);
            expect(deletedUser).toEqual({
                id: 1,
                name: 'John Doe',
                email: 'john@example.com'
            });
            const allUsers = await getAllUsers();
            expect(allUsers).toHaveLength(1);
        });

        test('throws error when user not found', async () => {
            await expect(deleteUser(999))
                .rejects.toThrow('User not found');
        });
    });
}); 