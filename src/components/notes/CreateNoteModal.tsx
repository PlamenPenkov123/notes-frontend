import { createSignal, Show } from "solid-js";
import { RemoteRepository } from "../../domain/repository/RemoteRepository";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const remoteRepository = new RemoteRepository();

export default function CreateNoteModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const { token } = useAuth();
  const { showToast } = useToast(); // ✅ Toast hook

  const handleCreate = async () => {
    if (!title().trim() || !content().trim()) return;

    setLoading(true);

    try {
      await remoteRepository.createNote(token()!, {
        title: title(),
        content: content(),
      });

      showToast("Note created successfully!", "success"); // ✅ Toast

      setTitle("");
      setContent("");
      props.onClose();

    } catch (err) {
      showToast("Failed to create note", "error"); // ❌ Toast error
    }

    setLoading(false);
  };

  return (
    <Show when={props.isOpen}>
      <div class="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm animate-fadeIn">

        {/* Modal */}
        <div class="relative bg-gray-800 text-white p-6 rounded-2xl shadow-2xl w-11/12 max-w-lg flex flex-col animate-scaleIn">

          <h2 class="text-3xl font-bold mb-5 text-green-500 text-center">
            Create Note
          </h2>

          <input
            class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 mb-4 placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            type="text"
            placeholder="Title"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />

          <textarea
            class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 h-36 mb-5 placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
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

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }

          .animate-scaleIn {
            animation: scaleIn 0.2s ease-out;
          }
        `}
      </style>
    </Show>
  );
}
