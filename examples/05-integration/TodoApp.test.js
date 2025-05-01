import { describe, test, expect, beforeEach } from 'vitest';
import { TodoApp } from './TodoApp';

describe('TodoApp Integration Tests', () => {
    let todoApp;

    beforeEach(() => {
        todoApp = new TodoApp();
    });

    test('complete todo workflow', () => {
        // Add todos
        const todo1 = todoApp.addTodo('Learn Jest');
        const todo2 = todoApp.addTodo('Write tests');
        const todo3 = todoApp.addTodo('Refactor code');

        // Verify initial state
        expect(todoApp.getStats()).toEqual({
            total: 3,
            active: 3,
            completed: 0
        });

        // Complete some todos
        todoApp.toggleTodo(todo1.id);
        todoApp.toggleTodo(todo2.id);

        // Verify stats after completion
        expect(todoApp.getStats()).toEqual({
            total: 3,
            active: 1,
            completed: 2
        });

        // Test filtering
        todoApp.setFilter('active');
        expect(todoApp.getFilteredTodos()).toHaveLength(1);
        expect(todoApp.getFilteredTodos()[0].text).toBe('Refactor code');

        todoApp.setFilter('completed');
        expect(todoApp.getFilteredTodos()).toHaveLength(2);
        expect(todoApp.getFilteredTodos().map(t => t.text)).toEqual([
            'Learn Jest',
            'Write tests'
        ]);

        // Clear completed todos
        const clearedTodos = todoApp.clearCompleted();
        expect(clearedTodos).toHaveLength(2);
        expect(todoApp.getStats()).toEqual({
            total: 1,
            active: 1,
            completed: 0
        });
    });

    test('todo lifecycle with error handling', () => {
        // Try to add empty todo
        expect(() => todoApp.addTodo('')).toThrow('Todo text cannot be empty');
        expect(() => todoApp.addTodo('   ')).toThrow('Todo text cannot be empty');

        // Add valid todo
        const todo = todoApp.addTodo('Valid todo');
        expect(todoApp.getStats().total).toBe(1);

        // Try to remove non-existent todo
        expect(() => todoApp.removeTodo(999)).toThrow('Todo not found');

        // Remove valid todo
        const removedTodo = todoApp.removeTodo(todo.id);
        expect(removedTodo).toEqual(todo);
        expect(todoApp.getStats().total).toBe(0);
    });

    test('filter interactions', () => {
        // Add todos
        const todo1 = todoApp.addTodo('Todo 1');
        const todo2 = todoApp.addTodo('Todo 2');
        todoApp.toggleTodo(todo1.id);

        // Test invalid filter
        expect(() => todoApp.setFilter('invalid')).toThrow('Invalid filter');

        // Test all filters
        todoApp.setFilter('all');
        expect(todoApp.getFilteredTodos()).toHaveLength(2);

        todoApp.setFilter('active');
        expect(todoApp.getFilteredTodos()).toHaveLength(1);
        expect(todoApp.getFilteredTodos()[0].text).toBe('Todo 2');

        todoApp.setFilter('completed');
        expect(todoApp.getFilteredTodos()).toHaveLength(1);
        expect(todoApp.getFilteredTodos()[0].text).toBe('Todo 1');
    });

    test('complex todo operations', () => {
        // Add multiple todos
        const todos = [
            todoApp.addTodo('First todo'),
            todoApp.addTodo('Second todo'),
            todoApp.addTodo('Third todo')
        ];

        // Complete first and last todos
        todoApp.toggleTodo(todos[0].id);
        todoApp.toggleTodo(todos[2].id);

        // Verify initial state
        expect(todoApp.getStats()).toEqual({
            total: 3,
            active: 1,
            completed: 2
        });

        // Remove a completed todo
        todoApp.removeTodo(todos[0].id);

        // Verify state after removal
        expect(todoApp.getStats()).toEqual({
            total: 2,
            active: 1,
            completed: 1
        });

        // Clear completed
        const clearedTodos = todoApp.clearCompleted();
        expect(clearedTodos).toHaveLength(1);
        expect(clearedTodos[0].text).toBe('Third todo');

        // Verify final state
        expect(todoApp.getStats()).toEqual({
            total: 1,
            active: 1,
            completed: 0
        });
        expect(todoApp.getFilteredTodos()[0].text).toBe('Second todo');
    });
}); 