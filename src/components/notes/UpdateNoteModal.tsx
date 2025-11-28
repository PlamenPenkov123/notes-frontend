import { createEffect, createSignal, Show } from "solid-js";
import { RemoteRepository } from "../../domain/repository/RemoteRepository";
import { Note } from "../../domain/entity/Note";

const remoteRepository = new RemoteRepository();

export default function UpdateNoteModal(props: {
  note: Note | null;
  onClose: () => void;
}) {
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  // Populate fields when note changes
  createEffect(() => {
    if (props.note) {
      setTitle(props.note.title);
      setContent(props.note.content);
    }
  });

  const handleUpdate = async () => {
    if (!props.note) return;
    if (!title().trim() || !content().trim()) return;

    setLoading(true);

    await remoteRepository.updateNote(props.note.id, {
      title: title().trim(),
      content: content().trim(),
    });

    setLoading(false);
    setTitle("");
    setContent("");

    props.onClose();
  };

  return (
    <Show when={props.note}>
      <div class="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/40">

        {/* Centered Card */}
        <div class="relative bg-gray-800 text-white p-6 rounded-2xl shadow-2xl w-11/12 max-w-lg flex flex-col">

          {/* Title */}
          <h2 class="text-3xl font-bold mb-5 text-green-500 text-center">
            Update Note
          </h2>

          {/* Input Fields */}
          <input
            class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            type="text"
            placeholder="Title"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />

          <textarea
            class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 h-36 mb-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
            placeholder="Content"
            value={content()}
            onInput={(e) => setContent(e.currentTarget.value)}
          />

          {/* Action Buttons */}
          <div class="flex justify-end gap-3">
            <button
              class="px-5 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={props.onClose}
              disabled={loading()}
            >
              Cancel
            </button>

            <button
              class="px-5 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUpdate}
              disabled={loading()}
            >
              {loading() ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
