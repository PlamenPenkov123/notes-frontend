import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const auth = useAuth();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  const submit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await auth.login(email(), password());
    } catch (err) {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    // 1. Container matching the background of NotesPage
    <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      
      {/* Card Wrapper */}
      <div class="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        
        <h1 class="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p class="text-gray-400 text-center mb-8">Please sign in to continue</p>

        {/* Error Message */}
        {error() && (
          <div class="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm text-center">
            {error()}
          </div>
        )}

        <form onSubmit={submit} class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
            <input 
              type="email"
              class="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-500"
              placeholder="you@example.com" 
              onInput={(e) => setEmail(e.currentTarget.value)} 
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              class="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-500"
              placeholder="••••••••" 
              onInput={(e) => setPassword(e.currentTarget.value)} 
              required
            />
          </div>

          {/* Button matching the 'Create Note' button style */}
          <button 
            type="submit" 
            disabled={loading()}
            class="mt-4 w-full px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading() ? "Signing in..." : "Login"}
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <A href="/register" class="text-green-400 hover:text-green-300 font-semibold hover:underline">
            Register here
          </A>
        </div>
      </div>
    </div>
  );
}