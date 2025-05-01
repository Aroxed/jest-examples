export class TodoApp {
    constructor() {
        this.todos = [];
        this.filters = {
            all: () => true,
            active: todo => !todo.completed,
            completed: todo => todo.completed
        };
        this.currentFilter = 'all';
    }

    addTodo(text) {
        if (!text.trim()) {
            throw new Error('Todo text cannot be empty');
        }
        const todo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date()
        };
        this.todos.push(todo);
        return todo;
    }

    removeTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) {
            throw new Error('Todo not found');
        }
        return this.todos.splice(index, 1)[0];
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        todo.completed = !todo.completed;
        return todo;
    }

    setFilter(filter) {
        if (!this.filters[filter]) {
            throw new Error('Invalid filter');
        }
        this.currentFilter = filter;
    }

    getFilteredTodos() {
        return this.todos.filter(this.filters[this.currentFilter]);
    }

    clearCompleted() {
        const completedTodos = this.todos.filter(todo => todo.completed);
        this.todos = this.todos.filter(todo => !todo.completed);
        return completedTodos;
    }

    getStats() {
        return {
            total: this.todos.length,
            active: this.todos.filter(todo => !todo.completed).length,
            completed: this.todos.filter(todo => todo.completed).length
        };
    }
} 