import { createEffect, createSignal, Show, onCleanup } from "solid-js";
import { RemoteRepository } from "../../domain/repository/RemoteRepository";
import { Note } from "../../domain/entity/Note";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext"; // ✅ import toast

const remoteRepository = new RemoteRepository();

export default function UpdateNoteModal(props: {
  note: Note | null;
  onClose: () => void;
}) {
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const { token } = useAuth();
  const { showToast } = useToast(); // ✅ toast hook

  const [open, setOpen] = createSignal(false);

  // Populate fields + trigger enter animation
  createEffect(() => {
    if (props.note) {
      setTitle(props.note.title);
      setContent(props.note.content);
      requestAnimationFrame(() => setOpen(true));
    } else {
      setOpen(false);
    }
  });

  const close = () => {
    setOpen(false);
    const ANIM_DURATION = 300;
    setTimeout(() => props.onClose(), ANIM_DURATION);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };

  createEffect(() => {
    if (props.note) {
      window.addEventListener("keydown", handleKey);
      onCleanup(() => window.removeEventListener("keydown", handleKey));
    }
  });

  const handleUpdate = async () => {
    if (!props.note) return;
    if (!title().trim() || !content().trim()) return;

    setLoading(true);

    try {
      await remoteRepository.updateNote(token()!, props.note.id, {
        title: title().trim(),
        content: content().trim(),
      });

      showToast("Note updated successfully!", "success"); // ✅ success toast
      setTitle("");
      setContent("");
      close();

    } catch (err) {
      showToast("Failed to update note", "error"); // ❌ error toast
    }

    setLoading(false);
  };

  return (
    <Show when={props.note}>
      <div class="fixed inset-0 z-50 flex items-center justify-center">

        {/* Backdrop */}
        <div
          class={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open() ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
        />

        {/* Modal */}
        <div
          class={`relative z-10 w-11/12 max-w-4xl max-h-[90vh] flex flex-col 
                      bg-gray-800 text-white rounded-3xl shadow-2xl 
                      transform transition-all duration-300 ease-[cubic-bezier(.2,.9,.3,1)]
                      ${
                        open()
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-6 scale-95"
                      }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header class="px-8 pt-8 pb-4">
            <h2 class="text-4xl font-extrabold text-yellow-400 text-center">
              Update Note
            </h2>
          </header>

          {/* Scrollable form */}
          <div class="px-8 pb-6 overflow-y-auto max-h-[60vh] space-y-5">
            <input
              class="w-full bg-gray-700 border border-gray-600 rounded-xl p-4 
                     placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-yellow-500 transition text-lg"
              type="text"
              placeholder="Title"
              value={title()}
              onInput={(e) => setTitle(e.currentTarget.value)}
            />

            <textarea
              class="w-full bg-gray-700 border border-gray-600 rounded-xl p-4 
                     placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-yellow-500 transition resize-none text-lg 
                     min-h-48 whitespace-pre-wrap wrap-break-word"
              placeholder="Content"
              value={content()}
              onInput={(e) => setContent(e.currentTarget.value)}
            />
          </div>

          {/* Footer */}
          <div class="px-8 pb-8 flex justify-end gap-3">
            <button
              class="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50"
              disabled={loading()}
              onClick={close}
            >
              Cancel
            </button>

            <button
              class="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 
                     transition disabled:opacity-50"
              disabled={loading()}
              onClick={handleUpdate}
            >
              {loading() ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
