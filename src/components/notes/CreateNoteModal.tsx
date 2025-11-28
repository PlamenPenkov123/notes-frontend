import { createSignal, Show } from "solid-js";
import { RemoteRepository } from "../../domain/repository/RemoteRepository";

const remoteRepository = new RemoteRepository();

export default function CreateNoteModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleCreate = async () => {
    if (!title().trim() || !content().trim()) return;

    setLoading(true);

    await remoteRepository.createNote({
      title: title(),
      content: content(),
    });

    setLoading(false);
    setTitle("");
    setContent("");

    props.onClose();
  };

  return (
    <Show when={props.isOpen}>
      <div class="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/40">
        {/* Centered Card */}
        <div class="relative bg-gray-800 text-white p-6 rounded-2xl shadow-2xl w-11/12 max-w-lg flex flex-col">
          <h2 class="text-3xl font-bold mb-5 text-green-500 text-center">
            Create Note
          </h2>

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
              onClick={handleCreate}
              disabled={loading()}
            >
              {loading() ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
