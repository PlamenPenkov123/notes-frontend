import { Note } from "../entity/Note";

export class RemoteRepository {
    async getNotes(): Promise<Note[]> {
        const response = await fetch(`/api/notes`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }

        const data = await response.json();
        return data;
    }

    async createNote(note: Omit<Note, 'id'>): Promise<Note> {
        const response = await fetch(`/api/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note)
        });

        if (!response.ok) {
            throw new Error('Failed to create note');
        }

        const data = await response.json();
        return data;
    }

    async updateNote(noteId: string, note: Omit<Note, 'id'>): Promise<Note> {
        const response = await fetch(`/api/notes/${noteId}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(note)
        });

        if (!response.ok) {
            throw new Error('Failed to update note');
        }

        const data = await response.json();
        return data;
    }

    async deleteNote(id: string): Promise<void> {
        const response = await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
        })
        if (!response.ok) {
            throw new Error('Failed to delete note');
        }
    }
}