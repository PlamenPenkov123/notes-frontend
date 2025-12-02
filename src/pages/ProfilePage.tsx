import { Show, createResource } from "solid-js";
import { useAuth } from "../context/AuthContext";
import { RemoteRepository } from "../domain/repository/RemoteRepository";
import { useNavigate } from "@solidjs/router";

const repo = new RemoteRepository();

export default function ProfilePage() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch user from backend (optional if your AuthContext already loads it)
  const [profile] = createResource(
    () => token(),
    (t) => repo.getUser(t!)
  );

  // Redirect if not logged in
  if (!token()) {
    navigate("/login", { replace: true });
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div class="min-h-screen bg-gray-900 flex justify-center items-center px-6">
      <Show when={profile()} fallback={<div class="text-white text-xl">Loading...</div>}>
        <div class="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-lg">
          <h1 class="text-3xl font-bold text-white mb-8 text-center">Your Profile</h1>

          <div class="space-y-6">
            <div class="p-4 bg-gray-700 rounded-xl shadow">
              <h2 class="text-gray-400 text-sm uppercase">Username</h2>
              <p class="text-xl text-white font-semibold">{profile()?.username}</p>
            </div>

            <div class="p-4 bg-gray-700 rounded-xl shadow">
              <h2 class="text-gray-400 text-sm uppercase">Email</h2>
              <p class="text-xl text-white font-semibold">{profile()?.email}</p>
            </div>
          </div>

          <button
            class="mt-8 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg transition-colors duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </Show>
    </div>
  );
}
