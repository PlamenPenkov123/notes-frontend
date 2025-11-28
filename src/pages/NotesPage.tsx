import { Component, createSignal, createResource } from "solid-js";
import { RemoteRepository } from "../domain/repository/RemoteRepository";
import NotesList from "../components/notes/NotesList";
import CreateNoteModal from "../components/notes/CreateNoteModal";

const remoteRepository = new RemoteRepository();

const NotesPage: Component = () => {
  const [notes, { refetch }] = createResource(() => remoteRepository.getNotes());

  // Signal to open/close the CreateNoteModal
  const [createModalOpen, setCreateModalOpen] = createSignal(false);

  return (
    <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center py-6">
      
      {/* Create Note Button */}
      <button
        class="mb-6 px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md"
        onClick={() => setCreateModalOpen(true)}
      >
        + Create Note
      </button>

      {/* Notes Grid */}
      <NotesList
        notes={notes}
        onDelete={() => refetch()} // refetch after delete or update
      />

      {/* Create Note Modal */}
      <CreateNoteModal
        isOpen={createModalOpen()}
        onClose={() => {
          setCreateModalOpen(false);
          refetch(); // refetch after creating a note
        }}
      />
    </div>
  );
};

export default NotesPage;
