import { Component } from "solid-js";

const Footer: Component = () => {
  return (
    <footer class="w-full bg-gray-900 text-gray-400 p-6 shadow-inner">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

        {/* Left side: copyright */}
        <div class="text-sm">
          &copy; {new Date().getFullYear()} Notes Dashboard. All rights reserved.
        </div>

        {/* Right side: links */}
        <div class="flex items-center space-x-4 text-sm">
          <a href="#" class="hover:text-white transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" class="hover:text-white transition-colors duration-200">
            Terms of Service
          </a>
          <a href="#" class="hover:text-white transition-colors duration-200">
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
