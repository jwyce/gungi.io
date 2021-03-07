export interface Session {
	userID: string;
	username: string;
	connected: boolean;
}

interface SessionStore {
	findSession(id: string): Session | undefined;
	saveSession(id: string, session: Session): void;
	findAllSessions(): Session[];
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
	findAllSessions(): Session[] {
		return [...this.sessions.values()];
	}
}
