import { createSignal, Show } from "solid-js";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const auth = useAuth();

  // form fields
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [passwordConfirm, setPasswordConfirm] = createSignal("");

  // UI state
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  const submit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await auth.register(username(), email(), password(), passwordConfirm());
      // optional: auto-login or navigate to login page here
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div class="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <h1 class="text-3xl font-bold text-center mb-4 text-white">Register</h1>

        {/* Error message */}
        <Show when={error()}>
          <div class="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm text-center">
            {error()}
          </div>
        </Show>

        <form onSubmit={submit} class="flex flex-col gap-4">
          <input
            class="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder-gray-400"
            placeholder="Username"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
            required
          />

          <input
            class="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder-gray-400"
            placeholder="Email"
            type="email"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            required
          />

          <input
            class="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder-gray-400"
            placeholder="Password"
            type="password"
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
            required
          />

          <input
            class="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder-gray-400"
            placeholder="Confirm Password"
            type="password"
            value={passwordConfirm()}
            onInput={(e) => setPasswordConfirm(e.currentTarget.value)}
            required
          />

          <button
            type="submit"
            disabled={loading()}
            class="mt-4 w-full px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading() ? "Registering..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
