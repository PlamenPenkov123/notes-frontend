import { createSignal, For, Resource, Show } from "solid-js";
import { Note } from "../../domain/entity/Note";
import { RemoteRepository } from "../../domain/repository/RemoteRepository";
import NoteDetailsModal from "./NoteDetailsModal";
import UpdateNoteModal from "./UpdateNoteModal";

const remoteRepository = new RemoteRepository();

export default function NotesList(props: { notes: Resource<Note[]>, onDelete: () => void }) {
  const [selectedNote, setSelectedNote] = createSignal<Note | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = createSignal<Note | null>(null);

  const handleDelete = async (id: string) => {
    await remoteRepository.deleteNote(id);
    props.onDelete(); // ✅ refetch after delete
  };

  return (
    <Show
      when={props.notes() && props.notes()!.length > 0}
      fallback={
        <h2 class="flex w-full py-6 text-gray-300 justify-center text-3xl font-bold">
          No notes available
        </h2>
      }
    >
      <div class="w-full flex flex-col items-center space-y-6 py-6 bg-gray-900 min-h-screen">
        <ul class="w-11/12 max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <For each={props.notes()}>
            {(note) => (
              <li class="h-full bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl">
                <h3 class="text-xl font-bold mb-3 text-white">{note.title}</h3>
                <p class="flex-1 text-gray-300 mb-4 line-clamp-4">{note.content}</p>

                <div class="mt-auto flex gap-2 w-full">
                  <button
                    class="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => setSelectedNote(note)}
                  >
                    Details
                  </button>

                  <button
                    class="flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors duration-200"
                    onClick={() => setUpdateModalOpen(note)}
                  >
                    Update
                  </button>

                  <button
                    class="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            )}
          </For>
        </ul>

        {/* MODALS */}
        <NoteDetailsModal
          note={selectedNote()}
          onClose={() => setSelectedNote(null)}
        />
        <UpdateNoteModal
          note={updateModalOpen()}
          onClose={() => {
            setUpdateModalOpen(null);
            props.onDelete(); // ✅ refetch after modal close (update)
          }}
        />
      </div>
    </Show>
  );
}
