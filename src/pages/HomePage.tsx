import { Component } from "solid-js";
import { A } from "@solidjs/router";

const HomePage: Component = () => {
  return (
    <div class="min-h-screen bg-gray-900 text-white flex flex-col">
      
      {/* Hero Section */}
      <section class="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-4">
          Welcome to <span class="text-green-500">Notes Dashboard</span>
        </h1>
        <p class="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl">
          Keep all your notes organized, view details, update, and manage them easily from a beautiful dashboard.
        </p>

        {/* Navigate to Notes Page */}
        <A
          href="/notes"
          class="px-6 py-3 bg-green-600 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
        >
          + Go to Notes
        </A>
      </section>

      {/* Features / Stats Section */}
      <section class="w-full py-16 bg-gray-800">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="p-6 bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <h2 class="text-2xl font-bold mb-2">Organize Notes</h2>
            <p class="text-gray-300">Keep your notes structured and easy to find with categories and tags.</p>
          </div>
          <div class="p-6 bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <h2 class="text-2xl font-bold mb-2">Fast & Simple</h2>
            <p class="text-gray-300">Create, update, and delete notes with just a few clicks. Lightning fast experience.</p>
          </div>
          <div class="p-6 bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <h2 class="text-2xl font-bold mb-2">Secure</h2>
            <p class="text-gray-300">Your notes stay private. No unnecessary access, everything stored safely.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
