import { A } from "@solidjs/router";
import { Component } from "solid-js";

const Header: Component = () => {
  return (
    <header class="w-full sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo / App Title */}
        <A href="/" class="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200">
          <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
            N
          </div>
          <h1 class="text-2xl md:text-3xl font-bold tracking-wide text-white">
            Notes Dashboard
          </h1>
        </A>

        {/* Actions / Buttons */}
        <div class="flex items-center space-x-3">
          <button class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-md">
            Profile
          </button>

          <button class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-md">
            Settings
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
