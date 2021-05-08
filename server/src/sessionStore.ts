export interface User {
	userId: string;
	username: string;
	userType: 'creator' | 'opponent' | 'spectator';
}
export interface Session {
	roomId: string;
	users: User[];
	game: any;
}

interface SessionStore {
	findSession(id: string): Session | undefined;
	saveSession(id: string, session: Session): void;
	destroySession(id: string): void;
	findAllSessions(): Session[];
	getUsers(id: string): User[];
	addUser(id: string, user: User): void;
	removeUser(id: string, userId: string): void;
}

export class InMemorySessionStore implements SessionStore {
	sessions: Map<string, Session>;

	constructor() {
		this.sessions = new Map();
	}

	findSession(id: string): Session | undefined {
		return this.sessions.get(id);
	}
	saveSession(id: string, session: Session): void {
		this.sessions.set(id, session);
	}
	destroySession(id: string): void {
		this.sessions.delete(id);
	}
	findAllSessions(): Session[] {
		return [...this.sessions.values()];
	}
	getUsers(id: string): User[] {
		const session = this.findSession(id);
		if (session) {
			return [...session.users];
		}

		return [];
	}
	addUser(id: string, user: User): void {
		const session = this.findSession(id);
		if (session) {
			session.users.push(user);
		}
	}
	removeUser(id: string, userId: string): void {
		const session = this.findSession(id);
		if (session) {
			const index = session.users.findIndex((x) => x.userId === userId);
			session.users.splice(index, 1);
		}
	}
}
