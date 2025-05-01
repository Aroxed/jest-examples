export class UserProfile {
    constructor(user) {
        this.user = user;
    }

    render() {
        const formatNumber = (num) => num.toLocaleString();
        const formatEmail = (email) => email.toLowerCase().trim();
        const formatRole = (role) => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

        return `
            <div class="user-profile">
                <h2>${this.user.name}</h2>
                <p class="email">${formatEmail(this.user.email)}</p>
                <p class="role">${formatRole(this.user.role)}</p>
                <div class="stats">
                    <span>Posts: ${formatNumber(this.user.posts)}</span>
                    <span>Comments: ${formatNumber(this.user.comments)}</span>
                </div>
            </div>
        `;
    }
} 