"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig"; // Import the initialized auth object
import { logout } from "../../utils/auth"; // Import the logout function from auth.js

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // To toggle mobile menu
  const [user, setUser] = useState(null); // Track the logged-in user
  const [loading, setLoading] = useState(true); // Track loading state

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/documents", label: "Documents" },
  ];

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user when authenticated
      } else {
        setUser(null); // Clear the user if not authenticated
      }
      setLoading(false); // Done loading whether user is authenticated or not
    });

    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from auth.js
      setUser(null); // Clear the user state after logout
      setMenuOpen(false); // Close the menu after logout
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  return (
    <>
      <nav className="bg-white py-4 shadow-md border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold flex items-center">
              <i className="fa-solid fa-crosshairs mr-1"></i>
              <span className="text-black">note</span>
              <span className="text-blue-500">scope</span>
            </a>
          </div>

          {/* Links for desktop */}
          <div className="hidden md:flex space-x-2 text-black font-bold">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 ${
                  pathname === link.href
                    ? "bg-blue-500 text-white rounded-lg"
                    : "hover:text-blue-400"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Profile icon or Login/Sign Up */}
          <div className="hidden md:flex space-x-4">
            {/* Render only if loading is done */}
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-8 h-8 rounded-full cursor-pointer"
                        />
                      ) : (
                        <div className="bg-gray-300 text-white flex items-center justify-center w-8 h-8 rounded-full cursor-pointer">
                          {user.displayName
                            ? user.displayName[0].toUpperCase() // Display initial of the user's name
                            : user.email[0].toUpperCase()}{" "}
                          {/* If no displayName, show initial of the email */}
                        </div>
                      )}
                    </button>

                    {menuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg  rounded-lg">
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="text-black px-4 py-2 rounded-lg"
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </>
            )}
          </div>

          {/* Hamburger menu for small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {menuOpen ? (
                <FiX className="text-black text-3xl" />
              ) : (
                <FiMenu className="text-black text-3xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white text-black font-bold space-y-2 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 ${
                  pathname === link.href
                    ? "bg-black text-white rounded-lg"
                    : "hover:text-blue-400"
                }`}
              >
                {link.label}
              </a>
            ))}
            {!loading && user && (
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 text-white text-center px-4 py-2 w-32 rounded-lg hover:bg-blue-600"
                >
                  Logout
                </button>
              </div>
            )}
            {!loading && !user && (
              <div className="flex flex-col space-y-2">
                <a href="/login" className="text-black px-4 py-2 rounded-lg">
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-blue-500 text-white text-center px-4 py-2 w-32 rounded-lg hover:bg-blue-600"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
