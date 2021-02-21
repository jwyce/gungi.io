interface User {
	id: string;
	username: string;
}
const users: User[] = [];

// Join user to lobby
export const userJoin = (id: string, username: string): User => {
	const user = { id, username };
	users.push(user);
	return user;
};

// Get current user
export const getCurrentUser = (id: string) => {
	return users.find((user) => user.id === id);
};

// User leaves server
export const userLeave = (id: string): User | null => {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}

	return null;
};

// Get online players
export const getOnlineUsers = () => {
	return users;
};
