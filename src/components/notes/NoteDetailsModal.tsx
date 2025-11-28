import { Show } from "solid-js";
import { Note } from "../../domain/entity/Note";

export default function NoteDetailsModal(props: {
  note: Note | null;
  onClose: () => void;
}) {
  return (
    <Show when={props.note}>
      <div class="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/40">

        {/* Centered Modal */}
        <div class="relative bg-gray-800 text-white p-6 rounded-2xl shadow-2xl w-11/12 max-w-lg flex flex-col">
          
          {/* Title */}
          <h2 class="text-3xl font-bold mb-5 text-green-500 text-center">
            {props.note!.title}
          </h2>

          {/* Content */}
          <p class="mb-6 whitespace-pre-wrap text-gray-200">
            {props.note!.content}
          </p>

          {/* Close Button */}
          <div class="flex justify-end">
            <button
              class="px-5 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
              onClick={props.onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
