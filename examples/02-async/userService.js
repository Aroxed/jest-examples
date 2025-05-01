// Simulated user data
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getUserById(id) {
    await delay(100); // Simulate API call
    const user = users.find(u => u.id === id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

export async function getAllUsers() {
    await delay(100); // Simulate API call
    return [...users];
}

export async function createUser(userData) {
    await delay(100); // Simulate API call
    if (!userData.name || !userData.email) {
        throw new Error('Name and email are required');
    }
    const newUser = {
        id: users.length + 1,
        ...userData
    };
    users.push(newUser);
    return newUser;
}

export async function updateUser(id, userData) {
    await delay(100); // Simulate API call
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    users[userIndex] = { ...users[userIndex], ...userData };
    return users[userIndex];
}

export async function deleteUser(id) {
    await delay(100); // Simulate API call
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    return deletedUser;
} 