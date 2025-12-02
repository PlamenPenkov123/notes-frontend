import { Show, createSignal, createEffect, onCleanup } from "solid-js";
import { Note } from "../../domain/entity/Note";

export default function NoteDetailsModal(props: {
  note: Note | null;
  onClose: () => void;
}) {
  // local visible state to support exit animation
  const [open, setOpen] = createSignal(false);

  // when props.note becomes non-null -> open modal (enter animation)
  createEffect(() => {
    if (props.note) {
      // small timeout to ensure CSS transition from initial state runs
      requestAnimationFrame(() => setOpen(true));
    } else {
      setOpen(false);
    }
  });

  // close handler that animates out and calls parent's onClose after animation
  const close = () => {
    // trigger exit animation
    setOpen(false);

    // allow the animation to complete before actually closing
    const ANIM_DURATION = 300; // ms - keep in sync with transition classes below
    setTimeout(() => props.onClose(), ANIM_DURATION);
  };

  // close on ESC
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };

  // Add/remove ESC listener only when modal is open
  createEffect(() => {
    if (props.note) {
      window.addEventListener("keydown", handleKey);
      onCleanup(() => window.removeEventListener("keydown", handleKey));
    }
  });

  return (
    <Show when={props.note}>
      {/* Backdrop */}
      <div
        class="fixed inset-0 z-50 flex items-center justify-center"
        aria-modal="true"
        role="dialog"
      >
        {/* backdrop layer: fade in/out */}
        <div
          class={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open() ? "opacity-100" : "opacity-0"
          }`}
          onClick={close} // click backdrop to close
        />

        {/* Modal panel: slide + scale + fade */}
        <div
          class={`relative z-10 w-11/12 max-w-4xl max-h-[88vh] flex flex-col rounded-3xl bg-gray-800 text-white shadow-2xl transform transition-all duration-300 ease-[cubic-bezier(.2,.9,.3,1)] 
                    ${
                      open()
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-6 scale-95"
                    }`}
          // prevent clicks inside panel closing via backdrop's onClick
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header class="px-8 pt-8 pb-4">
            <h2 class="text-4xl font-extrabold text-green-400 text-center">
              {props.note!.title}
            </h2>
          </header>

          {/* Content: scrollable, preserves whitespace, nicely wrapped */}
          <div class="px-8 pb-6 overflow-y-auto prose prose-invert max-h-[60vh]">
            {/* Use <pre> styling but let long words wrap */}
            <div
              class="whitespace-pre-wrap wrap-break-word text-lg leading-relaxed text-gray-100"
              // preserve the original newlines
            >
              {props.note!.content}
            </div>
          </div>

          {/* Footer / actions */}
          <div class="px-8 pb-8 pt-2 flex justify-end gap-3">
            <button
              class="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors duration-150"
              onClick={close}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
