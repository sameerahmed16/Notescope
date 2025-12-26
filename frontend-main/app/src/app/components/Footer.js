// src/app/components/Footer.js
"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className=" py-10 border-t border-gray-300 my-5 mt-40">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo and Description */}
        <div className="w-full md:w-1/3 p-4">
          <a href="/" className="text-2xl font-bold">
            <span className="text-black">note</span>
            <span className="text-blue-500">scope</span>
          </a>
          <p className="mt-2 text-gray-600">
            Notescope is an intuitive application designed to help users
            effortlessly organize, manage, and search lecture transcriptions and
            notes, enhancing productivity with powerful filtering and search
            capabilities.
          </p>
        </div>

        {/* Links */}
        <div className="w-full md:w-1/3 p-4">
          <h4 className="text-black font-semibold">Quick Links</h4>
          <ul className="list-none p-0 mt-2">
            <li className="mb-2">
              <a href="/" className="text-gray-600 hover:text-blue-500">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="/documents" className="text-gray-600 hover:text-blue-500">
                Documents
              </a>
            </li>
          </ul>
        </div>

   
      </div>

      <div className="container mx-auto text-center py-4 border-t border-gray-300 text-gray-600">
        <p>&copy; 2024 notescope. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
