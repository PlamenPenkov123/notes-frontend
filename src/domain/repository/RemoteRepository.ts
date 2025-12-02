import type { User } from "../entity/User";
import type { Note } from "../entity/Note";

export class RemoteRepository {

    private async request<T>(
        url: string,
        options: RequestInit = {},
        token?: string
    ): Promise<T> {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };

        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(message || `Request failed (${response.status})`);
        }

        return response.json() as Promise<T>;
    }

    // -------------------------------------------------------------------------
    // AUTH
    // -------------------------------------------------------------------------

    register(username: string, email: string, password: string, passwordConfirm: string) {
        return this.request<{ message: string }>(
            "/api/auth/register",
            {
                method: "POST",
                body: JSON.stringify({ username, email, password, passwordConfirm })
            }
        );
    }

    login(email: string, password: string) {
        return this.request<{ token: string }>(
            "/api/auth/login",
            {
                method: "POST",
                body: JSON.stringify({ email, password })
            }
        );
    }

    logout(token: string) {
        return this.request<{ message: string }>(
            "/api/auth/logout",
            {
                method: "POST",
            },
            token
        );
    }

    getUser(token: string): Promise<User | null> {
        if (!token) return Promise.resolve(null);
        return this.request<User>("/api/users/me", { method: "GET" }, token);
    }

    // -------------------------------------------------------------------------
    // NOTES
    // -------------------------------------------------------------------------

    getNotes(token: string): Promise<Note[] | null> {
        if (!token) return Promise.resolve(null);
        return this.request<Note[]>("/api/notes", { method: "GET" }, token);
    }

    createNote(token: string, note: Omit<Note, "id">): Promise<Note> {
        return this.request<Note>(
            "/api/notes",
            {
                method: "POST",
                body: JSON.stringify(note)
            },
            token
        );
    }

    updateNote(token: string, id: string, note: Omit<Note, "id">): Promise<Note> {
        return this.request<Note>(
            `/api/notes/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(note)
            },
            token
        );
    }

    deleteNote(token: string, id: string): Promise<void> {
        return this.request<void>(
            `/api/notes/${id}`,
            { method: "DELETE" },
            token
        );
    }
}
