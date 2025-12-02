import { createContext, useContext, createSignal, JSX, Show } from "solid-js";

type ToastType = "success" | "error";

interface ToastState {
  message: string;
  type: ToastType;
}

const ToastContext = createContext<{
  showToast: (msg: string, type?: ToastType) => void;
}>();

export function ToastProvider(props: { children: JSX.Element }) {
  const [toast, setToast] = createSignal<ToastState | null>(null);

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });

    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {props.children}

      <Show when={toast()}>
        <div class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-toast-in pointer-events-none">
          <div
            class={`px-4 py-3 rounded-lg shadow-lg text-white text-lg min-w-[200px] text-center
            ${toast()!.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          >
            {toast()!.message}
          </div>
        </div>

        <style>
          {`
          @keyframes toastIn {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-toast-in {
            animation: toastIn 0.3s ease-out;
          }
        `}
        </style>
      </Show>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext)!;
