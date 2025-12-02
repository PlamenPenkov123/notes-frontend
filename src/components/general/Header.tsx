import { A, useLocation } from "@solidjs/router";
import { Component, createSignal, Show } from "solid-js";
import { useAuth } from "../../context/AuthContext";

const Header: Component = () => {
  const { token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = createSignal(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header class="w-full sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <A href="/" class="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200">
          <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-lg shadow-md">N</div>
          <h1 class="text-2xl md:text-3xl font-bold tracking-wide text-white">Notes Dashboard</h1>
        </A>

        {/* Desktop menu */}
        <div class="hidden md:flex items-center space-x-3">
          <Show
            when={token()}
            fallback={
              <>
                <A
                  href="/login"
                  class={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
                    isActive("/login") ? "bg-green-600" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                >
                  Login
                </A>
                <A
                  href="/register"
                  class={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
                    isActive("/register") ? "bg-green-600" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                >
                  Register
                </A>
              </>
            }
          >
            <>
              <A
                href="/notes"
                class={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
                  isActive("/notes") ? "bg-blue-600" : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                Notes
              </A>
              <A
                href="/profile"
                class={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
                  isActive("/profile") ? "bg-blue-600" : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                Profile
              </A>
              <button
                class="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                onClick={logout}
              >
                Logout
              </button>
            </>
          </Show>
        </div>

        {/* Hamburger button */}
        <button
          class="md:hidden flex flex-col justify-center items-center space-y-1"
          onClick={() => setMenuOpen(!menuOpen())}
        >
          <span class="block w-6 h-0.5 bg-white rounded"></span>
          <span class="block w-6 h-0.5 bg-white rounded"></span>
          <span class="block w-6 h-0.5 bg-white rounded"></span>
        </button>
      </div>

      {/* Mobile dropdown */}
      <Show when={menuOpen()}>
        <div class="md:hidden bg-gray-800 text-white flex flex-col px-6 py-4 space-y-2 shadow-lg">
          <Show
            when={token()}
            fallback={
              <>
                <A
                  href="/login"
                  class={`block px-3 py-2 rounded-lg ${
                    isActive("/login") ? "bg-green-600" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                >
                  Login
                </A>
                <A
                  href="/register"
                  class={`block px-3 py-2 rounded-lg ${
                    isActive("/register") ? "bg-green-600" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                >
                  Register
                </A>
              </>
            }
          >
            <>
              <A
                href="/notes"
                class={`block px-3 py-2 rounded-lg ${
                  isActive("/notes") ? "bg-blue-600" : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                Notes
              </A>
              <A
                href="/profile"
                class={`block px-3 py-2 rounded-lg ${
                  isActive("/profile") ? "bg-blue-600" : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                Profile
              </A>
              <button
                class="block w-full text-left px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                onClick={() => { logout(); setMenuOpen(false); }}
              >
                Logout
              </button>
            </>
          </Show>
        </div>
      </Show>
    </header>
  );
};

export default Header;
