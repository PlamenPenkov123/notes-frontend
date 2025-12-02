import { Component } from "solid-js";
import { A } from "@solidjs/router";

const HomePage: Component = () => {
  return (
    <div class="min-h-screen bg-gray-900 text-white flex flex-col">

      {/* Hero Section */}
      <section class="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 md:py-24">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 animate-fadeIn">
          Welcome to <span class="text-green-500">Notes Dashboard</span>
        </h1>
        <p class="text-gray-300 text-base sm:text-lg md:text-xl mb-8 max-w-md sm:max-w-xl md:max-w-2xl animate-fadeIn delay-150">
          Keep all your notes organized, view details, update, and manage them easily from a beautiful dashboard.
        </p>

        {/* Navigate to Notes Page */}
        <A
          href="/notes"
          class="px-6 py-3 bg-green-600 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200 shadow-md animate-fadeIn delay-300"
        >
          + Go to Notes
        </A>
      </section>

      {/* Features / Stats Section */}
      <section class="w-full py-12 md:py-16 bg-gray-800">
        <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center px-4 sm:px-6">
          <div class="p-6 bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 animate-fadeIn">
            <h2 class="text-xl sm:text-2xl font-bold mb-2">Organize Notes</h2>
            <p class="text-gray-300 text-sm sm:text-base">
              Keep your notes structured and easy to find with categories and tags.
            </p>
          </div>
          <div class="p-6 bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 animate-fadeIn delay-150">
            <h2 class="text-xl sm:text-2xl font-bold mb-2">Fast & Simple</h2>
            <p class="text-gray-300 text-sm sm:text-base">
              Create, update, and delete notes with just a few clicks. Lightning fast experience.
            </p>
          </div>
          <div class="p-6 bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 animate-fadeIn delay-300">
            <h2 class="text-xl sm:text-2xl font-bold mb-2">Secure</h2>
            <p class="text-gray-300 text-sm sm:text-base">
              Your notes stay private. No unnecessary access, everything stored safely.
            </p>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .delay-150 { animation-delay: 0.15s; }
          .delay-300 { animation-delay: 0.3s; }
        `}
      </style>
    </div>
  );
};

export default HomePage;
