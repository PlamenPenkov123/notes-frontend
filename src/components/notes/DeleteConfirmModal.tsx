import { Show } from "solid-js";

export default function DeleteConfirmModal(props: {
  noteTitle: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Show when={props.noteTitle}>
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

        {/* Modal */}
        <div class="bg-gray-800 text-white p-7 rounded-2xl shadow-2xl w-11/12 max-w-md
                    animate-[fadeIn_0.2s_ease-out,scaleIn_0.2s_ease-out]">

          <h2 class="text-2xl font-bold text-red-500 text-center mb-4">
            Delete Note?
          </h2>

          <p class="text-gray-300 text-center mb-6">
            Are you sure you want to delete  
            <span class="font-semibold text-white"> "{props.noteTitle}" </span>?
            <br />
            This action cannot be undone.
          </p>

          <div class="flex justify-end gap-3">
            <button
              class="px-5 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
              onClick={props.onCancel}
            >
              Cancel
            </button>

            <button
              class="px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
              onClick={props.onConfirm}
            >
              Delete
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
            from { transform: scale(0.8); }
            to { transform: scale(1); }
          }
        `}
      </style>
    </Show>
  );
}
